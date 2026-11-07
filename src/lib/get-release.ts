import "server-only";

import {
  channel,
  platforms,
  version as builtInVersion,
  type Platform,
  type Release,
} from "@/lib/release";

/**
 * The release the site offers, with a download link on every file it can serve. Every
 * page that shows the version or a download reads it from here.
 *
 * With DOWNLOADS_API_URL set (read on the server, never sent to the browser), the links
 * come from that API. It answers with JSON like this:
 *
 *   {
 *     "version": "0.1.0",
 *     "downloads": {
 *       "macos-arm64": "https://downloads.example.com/NativeVM-0.1.0-macos-arm64.dmg",
 *       "windows-x64": { "url": "https://…/NativeVM-0.1.0-windows-x64-setup.exe", "size": "140 MB" },
 *       "linux-x64": "https://…/nativevm_0.1.0_amd64.deb"
 *     }
 *   }
 *
 * Each link is an https URL, or an object with `url` and, optionally, `size` and
 * `sha256`. A platform the API gives no link for shows as not available yet. If the API
 * can't be reached, or answers with anything else, the site keeps the built-in release.
 *
 * Without the API, each file is linked from NEXT_PUBLIC_DOWNLOAD_BASE_URL, or else from
 * the GitHub release for the tag.
 *
 * The site is a static export, so this runs while `npm run build` writes the pages: the
 * links are fixed into them, and a new release reaches the site with the next build.
 * Every page asks (its footer shows the version), so the answer is kept for the rest of
 * the build: the API sees about one request per build worker, not one per page.
 */
export function getRelease(): Promise<Release> {
  release ??= loadRelease();
  return release;
}

let release: Promise<Release> | undefined;

async function loadRelease(): Promise<Release> {
  const api = process.env.DOWNLOADS_API_URL;
  if (api) {
    const release = await releaseFromApi(api);
    if (release) return release;
  }
  return builtInRelease();
}

function builtInRelease(): Release {
  const base = (
    process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL ??
    `https://github.com/lioTauhid/NativePanel/releases/download/v${builtInVersion}`
  ).replace(/\/+$/, "");

  return {
    version: builtInVersion,
    channel,
    platforms: platforms.map((platform) =>
      platform.available
        ? {
            ...platform,
            artifacts: platform.artifacts.map((artifact) => ({
              ...artifact,
              url: `${base}/${artifact.file}`,
            })),
          }
        : platform,
    ),
  };
}

type Link = { url: string; size?: string; sha256?: string };

async function releaseFromApi(api: string): Promise<Release | null> {
  let body: unknown;
  try {
    const response = await fetch(api, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`it answered ${response.status}`);
    body = await response.json();
  } catch (error) {
    console.warn(`DOWNLOADS_API_URL: keeping the built-in release, because ${String(error)}`);
    return null;
  }

  if (!isRecord(body) || !isRecord(body.downloads)) {
    console.warn("DOWNLOADS_API_URL: keeping the built-in release, because the answer has no downloads");
    return null;
  }
  const downloads = body.downloads;
  const version =
    typeof body.version === "string" && body.version.trim() ? body.version.trim() : builtInVersion;

  return {
    version,
    channel,
    platforms: platforms.map((platform) =>
      withLink(platform, parseLink(downloads[platform.id]), version),
    ),
  };
}

/** A platform offering the one file the API links, or none. */
function withLink(platform: Platform, link: Link | null, version: string): Platform {
  const [primary] = platform.artifacts;
  // The file the build tool makes for this version.
  const built = primary.file.replace(builtInVersion, version);
  if (!link) {
    return { ...platform, available: false, artifacts: [{ label: primary.label, file: built }] };
  }
  // A link like /download?os=windows names no file: show the one the build tool makes.
  const named = fileName(link.url);
  const file = named && labelFor(named) ? named : built;
  return {
    ...platform,
    available: true,
    artifacts: [{ ...link, label: labelFor(file) ?? primary.label, file }],
  };
}

function parseLink(value: unknown): Link | null {
  const link = typeof value === "string" ? { url: value } : isRecord(value) ? value : null;
  // Installers are only ever linked over https.
  if (!link || typeof link.url !== "string" || !/^https:\/\/\S+$/i.test(link.url)) return null;
  return {
    url: link.url,
    ...(typeof link.size === "string" && link.size ? { size: link.size } : {}),
    ...(typeof link.sha256 === "string" && /^[0-9a-f]{64}$/i.test(link.sha256)
      ? { sha256: link.sha256.toLowerCase() }
      : {}),
  };
}

const labels: Array<[RegExp, string]> = [
  [/\.dmg$/i, "Disk image"],
  [/\.(exe|msi)$/i, "Installer"],
  [/\.zip$/i, "Portable .zip"],
  [/\.deb$/i, "Debian package"],
  [/\.rpm$/i, "RPM package"],
  [/\.appimage$/i, "AppImage"],
  [/\.tar\.gz$/i, "Portable .tar.gz"],
];

function labelFor(file: string): string | undefined {
  return labels.find(([pattern]) => pattern.test(file))?.[1];
}

function fileName(url: string): string | undefined {
  try {
    const last = new URL(url).pathname.split("/").filter(Boolean).pop();
    return last ? decodeURIComponent(last) : undefined;
  } catch {
    return undefined;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
