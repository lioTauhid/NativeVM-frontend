import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-700 shadow-[0_8px_30px_-8px_rgba(13,148,136,0.65)] hover:shadow-[0_10px_36px_-8px_rgba(13,148,136,0.8)]",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-accent-100",
  "outline-light":
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-13 px-6 text-base gap-2.5",
};

/**
 * A link drawn as one of the app's buttons: square, semibold, one teal primary.
 * External links and file downloads open as plain anchors.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external = false,
  download = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  download?: boolean;
}) {
  const classes = cn(
    "group/button inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:translate-y-px [&_svg]:size-[1.05em] [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

type Tone = "ok" | "alert" | "off" | "busy" | "led";

const tones: Record<Tone, string> = {
  ok: "bg-current",
  alert: "bg-alert",
  off: "border-[1.5px] border-current",
  busy: "bg-accent-400 animate-blink",
  led: "bg-led",
};

/**
 * The app's status mark: one small square. Filled is fine, red needs you,
 * hollow is stopped, blinking is working. It always sits beside words.
 */
export function Mark({ tone = "ok", className }: { tone?: Tone; className?: string }) {
  return <span aria-hidden className={cn("inline-block size-2 shrink-0", tones[tone], className)} />;
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("kicker", className)}>{children}</p>;
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

/** A section's opening: kicker, heading, and a sentence or two. */
export function SectionIntro({
  kicker,
  title,
  children,
  align = "left",
  dark = false,
  className,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className={cn("kicker", dark && "text-accent-400")}>{kicker}</p>
      <h2
        className={cn(
          "font-wide mt-4 text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.025em]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {children ? (
        <div
          className={cn(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-white/65" : "text-neutral-700",
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "pro" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold tracking-[0.1em] uppercase",
        tone === "neutral" && "border border-ink/20 text-neutral-700",
        tone === "accent" && "bg-accent-100 text-accent-800",
        tone === "pro" && "bg-ink text-white",
        tone === "dark" && "border border-white/15 text-white/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
