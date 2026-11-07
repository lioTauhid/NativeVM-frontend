import "server-only";

import {
  channel,
  fallbackVersion,
  platforms,
  primaryPlatform,
  releaseRepository,
  releasesPage,
  type Artifact,
  type OperatingSystem,
  type PlatformId,
  type Release,
} from "@/lib/release";

/**
 * The release the site offers, with a download link on every file it can serve. Every
 * page that shows the version or a download reads it from here.
 *
 * It's the release GitHub marks Latest in `releaseRepository`, read from GitHub's public
 * API while `npm run build` writes the pages. The site is a static export, so the links
 * are fixed into the pages: a new release reaches the site with the next build.
 *
 * - The release's tag is the version: v0.8.0 is 0.8.0.
 * - Each file goes to a platform by its name (see platformsOf), with the size and SHA-256
 *   GitHub gives it. A platform with no file shows as not available yet. Anything else,
 *   like checksum files or builds for other processors, is left out.
 * - While no release is marked Latest (every one is a pre-release, say), it's the newest.
 * - If GitHub can't be reached, or the release has no file the site can offer, the build
 *   carries on with `fallbackVersion`, and every download opens the latest release on
 *   GitHub. The build log says why.
 *
 * Every page asks (its footer shows the version), so the answer is kept for the rest of
 * the build: GitHub sees one request per build worker, not one per page. Without a token,
 * GitHub allows 60 requests an hour from one address; for builds that share one, set
 * GITHUB_TOKEN. It's read on the server and never reaches the browser.
 */
export function getRelease(): Promise<Release> {
  release ??= loadRelease();
  return release;
}

let release: Promise<Release> | undefined;

async function loadRelease(): Promise<Release> {
  let reason: string;
  try {
    const latest = await latestRelease();
    const offered = latest ? fromGitHub(latest) : null;
    if (offered) {
      const ids = offered.platforms.filter((platform) => platform.available).map((platform) => platform.id);
      console.info(`Downloads: Native VM ${offered.version} from ${offered.url} (${ids.join(", ")})`);
      return offered;
    }
    reason = latest
      ? `${releaseRepository}'s latest release, ${String(latest.tag_name)}, has no file for a platform the site lists`
      : `${releaseRepository} has no releases yet`;
  } catch (error) {
    reason = error instanceof Error ? error.message : String(error);
  }
  console.warn(`Downloads: ${reason}, so every download opens ${releasesPage}/latest`);
  return fallbackRelease();
}

async function latestRelease(): Promise<Record<string, unknown> | null> {
  const latest = await github("releases/latest");
  if (isRecord(latest)) return latest;
  // GitHub marks no release Latest while every one is a pre-release: take the newest.
  const all = await github("releases?per_page=10");
  if (all === null) throw new Error(`${releaseRepository} isn't on GitHub, or isn't public`);
  if (!Array.isArray(all)) return null;
  return all.find((item): item is Record<string, unknown> => isRecord(item) && item.draft !== true) ?? null;
}

/** A GET from GitHub's API for the repository: its JSON, or null if GitHub has no such thing. */
async function github(path: string): Promise<unknown> {
  const token = process.env.GITHUB_TOKEN;
  let response: Response;
  try {
    response = await fetch(`https://api.github.com/repos/${releaseRepository}/${path}`, {
      headers: {
        accept: "application/vnd.github+json",
        "user-agent": "nativevm-website",
        "x-github-api-version": "2022-11-28",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new Error(`GitHub couldn't be reached (${String(error)})`);
  }
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(
      response.headers.get("x-ratelimit-remaining") === "0"
        ? "GitHub's hourly limit for this address is used up (set GITHUB_TOKEN)"
        : `GitHub answered ${response.status}`,
    );
  }
  return response.json();
}

type ReleaseFile = { platforms: PlatformId[]; rank: number; artifact: Artifact };

function fromGitHub(found: Record<string, unknown>): Release | null {
  const tag = typeof found.tag_name === "string" ? found.tag_name.trim() : "";
  const version = tag.replace(/^v(?=\d)/i, "");
  if (!version) return null;

  const files = (Array.isArray(found.assets) ? found.assets : [])
    .map(fileOf)
    .filter((file): file is ReleaseFile => file !== null);
  const leftOut = files.filter((file) => file.platforms.length === 0);
  if (leftOut.length) {
    console.info(
      `Downloads: leaving out ${leftOut.map((file) => file.artifact.file).join(", ")}, for systems the site doesn't list`,
    );
  }

  const release: Release = {
    version,
    channel,
    url: httpsUrl(found.html_url) ?? `${releasesPage}/tag/${encodeURIComponent(tag)}`,
    ...(typeof found.published_at === "string" ? { published: found.published_at } : {}),
    platforms: platforms.map((platform) => {
      const artifacts = files
        .filter((file) => file.platforms.includes(platform.id))
        .sort((a, b) => a.rank - b.rank || a.artifact.file.localeCompare(b.artifact.file))
        .map((file) => file.artifact);
      if (artifacts.length) return { ...platform, available: true, artifacts };
      // Not in this release: the files it would have, shown as coming later.
      return {
        ...platform,
        available: false,
        artifacts: platform.artifacts.map(({ label, file }) => ({
          label,
          file: file.replace(fallbackVersion, version),
        })),
      };
    }),
  };
  return release.platforms.some((platform) => platform.available) ? release : null;
}

/** The kinds of file people download, in the order a platform lists them: installers first. */
const kinds: Array<{ pattern: RegExp; label: string; os?: OperatingSystem }> = [
  { pattern: /\.dmg$/i, label: "Disk image", os: "macOS" },
  { pattern: /\.pkg$/i, label: "Installer package", os: "macOS" },
  { pattern: /\.(exe|msi)$/i, label: "Installer", os: "Windows" },
  { pattern: /\.deb$/i, label: "Debian package", os: "Linux" },
  { pattern: /\.rpm$/i, label: "RPM package", os: "Linux" },
  { pattern: /\.appimage$/i, label: "AppImage", os: "Linux" },
  { pattern: /\.zip$/i, label: "Portable .zip" },
  { pattern: /\.(tar\.gz|tgz)$/i, label: "Portable .tar.gz" },
];

/** A release file people can download, or null for anything else (checksums, signatures). */
function fileOf(asset: unknown): ReleaseFile | null {
  if (!isRecord(asset)) return null;
  const { name, state } = asset;
  const url = httpsUrl(asset.browser_download_url);
  const rank = typeof name === "string" ? kinds.findIndex((kind) => kind.pattern.test(name)) : -1;
  // A file still uploading isn't offered until GitHub has all of it.
  if (typeof name !== "string" || !url || rank < 0 || (state !== undefined && state !== "uploaded")) {
    return null;
  }

  const size = typeof asset.size === "number" ? formatSize(asset.size) : undefined;
  const sha256 =
    typeof asset.digest === "string"
      ? /^sha256:([0-9a-f]{64})$/i.exec(asset.digest)?.[1]?.toLowerCase()
      : undefined;
  return {
    platforms: platformsOf(name, kinds[rank].os),
    rank,
    artifact: {
      label: kinds[rank].label,
      file: name,
      url,
      ...(size ? { size } : {}),
      ...(sha256 ? { sha256 } : {}),
    },
  };
}

const systemNames: Array<[OperatingSystem, string[]]> = [
  ["macOS", ["macos", "mac", "osx", "darwin"]],
  ["Windows", ["windows", "win", "win32", "win64"]],
  ["Linux", ["linux"]],
];

const idPrefix: Record<OperatingSystem, string> = { macOS: "macos", Windows: "windows", Linux: "linux" };

/**
 * The platforms a file is for, read from its name the way the app's build tool writes it:
 * NativeVM-0.8.0-macos-arm64.dmg, NativeVM-0.8.0-windows-x64-setup.exe,
 * nativevm_0.8.0_amd64.deb, NativeVM-0.8.0-linux-x64.tar.gz. The system is implied by the
 * kind of file (a .dmg is for macOS) or else named. A name with no processor is for the
 * system's usual one, and a universal build is for both of the Mac's.
 */
function platformsOf(name: string, implied: OperatingSystem | undefined): PlatformId[] {
  const lower = name.toLowerCase();
  const words = new Set(lower.split(/[^a-z0-9]+/));
  const os = implied ?? systemNames.find(([, names]) => names.some((word) => words.has(word)))?.[0];
  if (!os) return [];

  let chips: string[] | undefined;
  if (words.has("universal")) chips = ["arm64", "x64"];
  else if (words.has("arm64") || words.has("aarch64")) chips = ["arm64"];
  else if (words.has("x64") || words.has("amd64") || /x86[-_]64/.test(lower)) chips = ["x64"];
  else if (["x86", "ia32", "i386", "i686", "arm", "armhf", "armv7l"].some((word) => words.has(word))) {
    chips = ["other"];
  }

  const ids = chips ? chips.map((chip) => `${idPrefix[os]}-${chip}`) : [primaryPlatform[os]];
  return ids.filter((id): id is PlatformId => platforms.some((platform) => platform.id === id));
}

/** Bytes, the way GitHub's release page shows them: 159250453 is "152 MB". */
function formatSize(bytes: number): string | undefined {
  if (!Number.isFinite(bytes) || bytes <= 0) return undefined;
  const megabytes = bytes / 1024 ** 2;
  if (megabytes >= 1024) return `${(megabytes / 1024).toFixed(1)} GB`;
  if (megabytes >= 1) return `${Math.round(megabytes)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function httpsUrl(value: unknown): string | undefined {
  return typeof value === "string" && /^https:\/\/\S+$/i.test(value) ? value : undefined;
}

function fallbackRelease(): Release {
  const latest = `${releasesPage}/latest`;
  return {
    version: fallbackVersion,
    channel,
    url: latest,
    platforms: platforms.map((platform) =>
      platform.available
        ? { ...platform, artifacts: platform.artifacts.map((artifact) => ({ ...artifact, url: latest })) }
        : platform,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
