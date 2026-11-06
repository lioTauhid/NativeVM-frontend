"use client";

import { ArrowDown, Download } from "lucide-react";
import { useSyncExternalStore } from "react";

import { OsBadge } from "@/components/download/os-badge";
import { downloadUrl, platform, type OperatingSystem } from "@/lib/release";

const subscribe = () => () => {};

/** The visitor's desktop system, or null for a phone, a tablet or one we can't tell. */
function detect(): OperatingSystem | null {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const name = `${nav.userAgentData?.platform ?? ""} ${nav.userAgent}`.toLowerCase();
  if (/iphone|ipad|android|mobile/.test(name)) return null;
  if (name.includes("mac")) return "macOS";
  if (name.includes("win")) return "Windows";
  if (name.includes("linux") || name.includes("x11")) return "Linux";
  return null;
}

/** The download that suits this visitor, picked in the browser. */
export function RecommendedDownload() {
  const os = useSyncExternalStore(subscribe, detect, () => null);
  const mac = platform("macos-arm64");
  const dmg = mac.artifacts[0];

  if (os === "Windows" || os === "Linux") {
    return (
      <div className="border border-white/15 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
        <div className="flex items-center gap-4">
          <OsBadge os={os} />
          <div>
            <p className="text-lg font-bold">Native VM for {os} is on its way</p>
            <p className="text-sm text-white/60">
              The {os} build is next. Until then, Native VM runs on macOS with Apple silicon.
            </p>
          </div>
        </div>
        <a
          href="#platforms"
          className="mt-6 inline-flex h-12 items-center gap-2 border border-white/25 px-5 font-semibold hover:border-white/60"
        >
          See every platform <ArrowDown className="size-4" aria-hidden />
        </a>
      </div>
    );
  }

  return (
    <div className="border border-white/15 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
      <div className="flex items-center gap-4">
        <OsBadge os="macOS" className="bg-white! text-ink!" />
        <div>
          <p className="text-lg font-bold">
            {os === "macOS" ? "Native VM for your Mac" : "Native VM for macOS"}
          </p>
          <p className="text-sm text-white/60">{mac.requirement}</p>
        </div>
      </div>
      <a
        href={downloadUrl(dmg.file)}
        download=""
        className="mt-6 flex h-13 w-full items-center justify-center gap-2.5 bg-accent px-6 font-semibold text-white shadow-[0_10px_36px_-8px_rgba(13,148,136,0.8)] transition-colors hover:bg-accent-700"
      >
        <Download className="size-[18px]" aria-hidden /> Download for macOS
      </a>
      <p className="mt-3 text-center text-[13px] text-white/50">
        {dmg.file} · {dmg.size}
      </p>
    </div>
  );
}
