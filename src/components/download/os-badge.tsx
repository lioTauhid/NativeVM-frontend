import { cn } from "@/lib/cn";
import type { OperatingSystem } from "@/lib/release";

const badges: Record<OperatingSystem, { text: string; colour: string }> = {
  macOS: { text: "mac", colour: "#201e1d" },
  Windows: { text: "win", colour: "#0067b8" },
  Linux: { text: "lnx", colour: "#444141" },
};

/** An operating system as a monogram square, in the style of the framework badges. */
export function OsBadge({ os, className }: { os: OperatingSystem; className?: string }) {
  const badge = badges[os];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center text-[15px] font-extrabold tracking-[-0.03em] text-white",
        className,
      )}
      style={{ backgroundColor: badge.colour }}
    >
      {badge.text}
    </span>
  );
}
