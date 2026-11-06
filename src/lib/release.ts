/**
 * The current release: its version, the beta channel, and the files built for each
 * platform. Safe to import anywhere, including client components.
 *
 * Where each file downloads from is decided in one place, getRelease() in
 * ./get-release.ts: an API when DOWNLOADS_API_URL is set, otherwise the folder these
 * file names are published in.
 *
 * File names follow the desktop app's build tool (tools/build_app.py):
 *   NativeVM-<version>-macos-<arch>.dmg
 *   NativeVM-<version>-windows-<arch>-setup.exe, and NativeVM-<version>-windows-<arch>.zip
 *   nativevm_<version>_<debian arch>.deb, and NativeVM-<version>-linux-<arch>.tar.gz
 *
 * To publish a new build without the API: bump `version`, flip `available` on what you
 * uploaded, and update the sizes.
 */

export type PlatformId = "macos-arm64" | "macos-x64" | "windows-x64" | "linux-x64";

export type OperatingSystem = "macOS" | "Windows" | "Linux";

export type Artifact = {
  /** What the file is, for a person: "Installer", "Disk image". */
  label: string;
  file: string;
  /** Rounded, as people say it: "152 MB". */
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
  platforms: Platform[];
};

export const version = "0.1.0";

export const channel = "Beta";

/** The systems Native VM runs on, in the order the site lists them. */
export const desktopSystems: OperatingSystem[] = ["macOS", "Windows", "Linux"];

/** The build a visitor on each system is offered first. */
export const primaryPlatform: Record<OperatingSystem, PlatformId> = {
  macOS: "macos-arm64",
  Windows: "windows-x64",
  Linux: "linux-x64",
};

export const platforms: Platform[] = [
  {
    id: "macos-arm64",
    os: "macOS",
    chip: "Apple silicon",
    requirement: "macOS 15 Sequoia or later, on an M-series Mac",
    available: true,
    artifacts: [{ label: "Disk image", file: `NativeVM-${version}-macos-arm64.dmg`, size: "152 MB" }],
  },
  {
    id: "windows-x64",
    os: "Windows",
    chip: "x64",
    requirement: "Windows 10 or 11, 64-bit",
    available: true,
    artifacts: [
      { label: "Installer", file: `NativeVM-${version}-windows-x64-setup.exe` },
      { label: "Portable .zip", file: `NativeVM-${version}-windows-x64.zip` },
    ],
  },
  {
    id: "linux-x64",
    os: "Linux",
    chip: "x64",
    requirement: "Ubuntu 22.04 or 24.04, or Debian 12",
    available: true,
    artifacts: [
      { label: "Debian package", file: `nativevm_${version}_amd64.deb` },
      { label: "Portable .tar.gz", file: `NativeVM-${version}-linux-x64.tar.gz` },
    ],
  },
  {
    id: "macos-x64",
    os: "macOS",
    chip: "Intel",
    requirement: "macOS 15 Sequoia or later, on an Intel Mac",
    available: false,
    artifacts: [{ label: "Disk image", file: `NativeVM-${version}-macos-x64.dmg` }],
  },
];

/** The first file of a platform that can be downloaded, if any. */
export function primaryDownload(platform: Platform | undefined): Artifact | undefined {
  if (!platform?.available) return undefined;
  return platform.artifacts.find((artifact) => artifact.url);
}

/** The servers Native VM manages. Anything else is refused with a clear message. */
export const supportedServers = ["Ubuntu 22.04 LTS", "Ubuntu 24.04 LTS", "Debian 12"] as const;
