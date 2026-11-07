/**
 * What a release is made of, and what the site knows about each platform before it asks
 * GitHub. Safe to import anywhere, including client components.
 *
 * Every build of the app is published as a release of the GitHub repository below.
 * getRelease() in ./get-release.ts reads the latest one while the site builds: its tag is
 * the version, and its files are matched to these platforms by name. Publishing a build
 * needs no change here; see "Publishing a release" in the README.
 */

export type PlatformId = "macos-arm64" | "macos-x64" | "windows-x64" | "linux-x64";

export type OperatingSystem = "macOS" | "Windows" | "Linux";

export type Artifact = {
  /** What the file is, for a person: "Installer", "Disk image". */
  label: string;
  file: string;
  /** Rounded, as GitHub shows it: "152 MB". */
  size?: string;
  /** Lowercase hex, when known. Leave it out rather than guess. */
  sha256?: string;
  /** Where it downloads from. getRelease() fills it in; a file without one isn't offered. */
  url?: string;
};

export type Platform = {
  id: PlatformId;
  os: OperatingSystem;
  /** The processor, as people know it. */
  chip: string;
  requirement: string;
  /** Built and offered for download. */
  available: boolean;
  artifacts: Artifact[];
};

export type Release = {
  version: string;
  /** Every build is a beta until 1.0. */
  channel: typeof channel;
  /** The release's page on GitHub: its notes and every file. */
  url: string;
  /** When it was published, as an ISO 8601 time, when known. */
  published?: string;
  platforms: Platform[];
};

/** The public GitHub repository every build of the app is released from. */
export const releaseRepository = "lioTauhid/NativeVM-frontend";

/** Every release, newest first. Add /latest for the newest one. */
export const releasesPage = `https://github.com/${releaseRepository}/releases`;

/**
 * The version pages show if GitHub can't be reached while the site builds. Their
 * downloads then open the latest release on GitHub, so they still work.
 */
export const fallbackVersion = "0.8.0";

export const channel = "Beta";

/** The systems Native VM runs on, in the order the site lists them. */
export const desktopSystems: OperatingSystem[] = ["macOS", "Windows", "Linux"];

/** The build a visitor on each system is offered first. */
export const primaryPlatform: Record<OperatingSystem, PlatformId> = {
  macOS: "macos-arm64",
  Windows: "windows-x64",
  Linux: "linux-x64",
};

/**
 * Each platform, in the order the Download page lists them. `available` and `artifacts`
 * are what a release usually holds, named the way the app's build tool (tools/build_app.py)
 * names them. They're used only where the latest release can't say: for a platform it has
 * no file for, shown as coming later, and for every link if GitHub can't be reached.
 */
export const platforms: Platform[] = [
  {
    id: "macos-arm64",
    os: "macOS",
    chip: "Apple silicon",
    requirement: "macOS 15 Sequoia or later, on an M-series Mac",
    available: true,
    artifacts: [{ label: "Disk image", file: `NativeVM-${fallbackVersion}-macos-arm64.dmg` }],
  },
  {
    id: "windows-x64",
    os: "Windows",
    chip: "x64",
    requirement: "Windows 10 or 11, 64-bit",
    available: true,
    artifacts: [{ label: "Installer", file: `NativeVM-${fallbackVersion}-windows-x64-setup.exe` }],
  },
  {
    id: "linux-x64",
    os: "Linux",
    chip: "x64",
    requirement: "Ubuntu 22.04 or 24.04, or Debian 12",
    available: true,
    artifacts: [
      { label: "Debian package", file: `nativevm_${fallbackVersion}_amd64.deb` },
      { label: "Portable .tar.gz", file: `NativeVM-${fallbackVersion}-linux-x64.tar.gz` },
    ],
  },
  {
    id: "macos-x64",
    os: "macOS",
    chip: "Intel",
    requirement: "macOS 15 Sequoia or later, on an Intel Mac",
    available: false,
    artifacts: [{ label: "Disk image", file: `NativeVM-${fallbackVersion}-macos-x64.dmg` }],
  },
];

/** The first file of a platform that can be downloaded, if any. */
export function primaryDownload(platform: Platform | undefined): Artifact | undefined {
  if (!platform?.available) return undefined;
  return platform.artifacts.find((artifact) => artifact.url);
}

/**
 * The files install instructions name, as they download from `release`. One its platform
 * doesn't offer is named the way the build tool names it; a portable one is left out.
 */
export function installFiles({ version, platforms }: Pick<Release, "version" | "platforms">) {
  const offered = (id: PlatformId, kind: RegExp) => {
    const platform = platforms.find((item) => item.id === id);
    if (!platform?.available) return undefined;
    return platform.artifacts.find((artifact) => artifact.url && kind.test(artifact.file))?.file;
  };
  return {
    dmg: offered("macos-arm64", /\.dmg$/i) ?? `NativeVM-${version}-macos-arm64.dmg`,
    installer:
      offered("windows-x64", /\.(exe|msi)$/i) ?? `NativeVM-${version}-windows-x64-setup.exe`,
    portableZip: offered("windows-x64", /\.zip$/i),
    deb: offered("linux-x64", /\.deb$/i) ?? `nativevm_${version}_amd64.deb`,
    portableTarball: offered("linux-x64", /\.(tar\.gz|tgz)$/i),
  };
}

/** The servers Native VM manages. Anything else is refused with a clear message. */
export const supportedServers = ["Ubuntu 22.04 LTS", "Ubuntu 24.04 LTS", "Debian 12"] as const;
