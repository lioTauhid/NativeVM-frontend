/**
 * The current release and where its files are downloaded from.
 *
 * File names follow the desktop app's build tool (tools/build_app.py):
 *   NativeVM-<version>-macos-<arch>.dmg
 *   NativeVM-<version>-windows-<arch>-setup.exe, and NativeVM-<version>-windows-<arch>.zip
 *   nativevm_<version>_<debian arch>.deb, and NativeVM-<version>-linux-<arch>.tar.gz
 *
 * To publish a new build: bump `version`, flip `available` on what you uploaded,
 * and update the sizes. Set NEXT_PUBLIC_DOWNLOAD_BASE_URL to host the files
 * somewhere other than the GitHub release for the tag.
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
};

export type Platform = {
  id: PlatformId;
  os: OperatingSystem;
  /** The processor, as people know it. */
  chip: string;
  requirement: string;
  available: boolean;
  artifacts: Artifact[];
};

export const version = "0.1.0";

const downloadBase = (
  process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL ??
  `https://github.com/lioTauhid/NativePanel/releases/download/v${version}`
).replace(/\/+$/, "");

export function downloadUrl(file: string): string {
  return `${downloadBase}/${file}`;
}

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
    id: "macos-x64",
    os: "macOS",
    chip: "Intel",
    requirement: "macOS 15 Sequoia or later, on an Intel Mac",
    available: false,
    artifacts: [{ label: "Disk image", file: `NativeVM-${version}-macos-x64.dmg` }],
  },
  {
    id: "windows-x64",
    os: "Windows",
    chip: "x64",
    requirement: "Windows 10 or 11, 64-bit",
    available: false,
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
    available: false,
    artifacts: [
      { label: "Debian package", file: `nativevm_${version}_amd64.deb` },
      { label: "Portable .tar.gz", file: `NativeVM-${version}-linux-x64.tar.gz` },
    ],
  },
];

export function platform(id: PlatformId): Platform {
  const found = platforms.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown platform ${id}`);
  return found;
}

/** The servers Native VM manages. Anything else is refused with a clear message. */
export const supportedServers = ["Ubuntu 22.04 LTS", "Ubuntu 24.04 LTS", "Debian 12"] as const;
