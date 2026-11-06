import Image from "next/image";

import { cn } from "@/lib/cn";
import { screens, type ScreenName } from "@/lib/screens";

/**
 * A screenshot of the app in a desktop window: a title bar with the app's
 * square window controls, then the screen itself.
 */
export function WindowFrame({
  name,
  className,
  sizes = "(min-width: 1280px) 1200px, 100vw",
  eager = false,
  tone = "dark",
  caption,
}: {
  name: ScreenName;
  className?: string;
  sizes?: string;
  /** For the first screen a visitor sees. */
  eager?: boolean;
  tone?: "dark" | "light";
  caption?: string;
}) {
  const screen = screens[name];
  return (
    <figure className={cn("m-0", className)}>
      <div
        className={cn(
          "overflow-hidden border",
          tone === "dark"
            ? "border-white/12 bg-[#151413] shadow-[0_50px_120px_-40px_rgba(13,148,136,0.55),0_30px_60px_-30px_rgba(0,0,0,0.6)]"
            : "border-ink/15 bg-white shadow-[0_30px_80px_-40px_rgba(32,30,29,0.45)]",
        )}
      >
        <div
          className={cn(
            "flex h-8 items-center gap-1.5 border-b px-3",
            tone === "dark" ? "border-white/10 bg-[#1b1a19]" : "border-ink/10 bg-neutral-200",
          )}
        >
          <span className="size-2.5 bg-alert/80" />
          <span className="size-2.5 bg-[#e8b339]" />
          <span className="size-2.5 bg-led/80" />
          <span
            className={cn(
              "mx-auto truncate px-4 text-xs font-medium",
              tone === "dark" ? "text-white/45" : "text-neutral-600",
            )}
          >
            {screen.title}
          </span>
          <span className="w-[38px] shrink-0" aria-hidden />
        </div>
        <Image
          src={screen.image}
          alt={screen.alt}
          sizes={sizes}
          quality={90}
          placeholder="blur"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="block h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-neutral-600">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
