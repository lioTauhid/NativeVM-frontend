"use client";

import { ArrowDown, Download } from "lucide-react";

import { OsBadge } from "@/components/download/os-badge";
import { cn } from "@/lib/cn";
import { desktopSystems, primaryDownload, primaryPlatform, type Platform } from "@/lib/release";
import { useVisitorOs } from "@/lib/use-visitor-os";

/**
 * A download for each system, with the visitor's own in emphasis once the browser has
 * said which it is. The list keeps its shape either way, so nothing jumps.
 */
export function RecommendedDownload({
  platforms,
  version,
  channel,
}: {
  platforms: Platform[];
  version: string;
  channel: string;
}) {
  const os = useVisitorOs();
  return (
    <div className="border border-white/15 bg-white/[0.04] p-6 backdrop-blur sm:p-7">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-lg font-bold">Choose your system</p>
        <p className="text-[13px] text-white/50">
          {channel} · {version}
        </p>
      </div>
      <ul className="mt-5 space-y-3">
        {desktopSystems.map((system) => {
          const platform = platforms.find((item) => item.id === primaryPlatform[system]);
          const file = primaryDownload(platform);
          const yours = os === system;
          return (
            <li
              key={system}
              className={cn(
                "flex items-center gap-4 border p-3.5 transition-colors",
                yours ? "border-accent-400/60 bg-accent/10" : "border-white/10",
              )}
            >
              <OsBadge os={system} className={system === "macOS" ? "bg-white! text-ink!" : undefined} />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-x-2 font-semibold">
                  {system}
                  {yours ? (
                    <span className="text-[11px] font-semibold tracking-[0.1em] text-accent-400 uppercase">
                      Your system
                    </span>
                  ) : null}
                </p>
                <p className="text-[13px] leading-snug text-white/55">
                  {platform?.requirement}
                  {file?.size ? ` · ${file.size}` : ""}
                </p>
              </div>
              {file ? (
                <a
                  href={file.url}
                  download=""
                  aria-label={`Download Native VM for ${system}`}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 px-4 text-sm font-semibold transition-colors",
                    yours
                      ? "bg-accent text-white shadow-[0_10px_36px_-8px_rgba(13,148,136,0.8)] hover:bg-accent-700"
                      : "border border-white/25 text-white hover:border-white/60",
                  )}
                >
                  <Download className="size-4" aria-hidden /> Download
                </a>
              ) : (
                <span className="shrink-0 text-[13px] text-white/45">Not yet</span>
              )}
            </li>
          );
        })}
      </ul>
      <a
        href="#platforms"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 hover:text-white"
      >
        Every file, and Intel Macs <ArrowDown className="size-3.5" aria-hidden />
      </a>
    </div>
  );
}
