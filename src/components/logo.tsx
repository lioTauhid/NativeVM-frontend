import { cn } from "@/lib/cn";

/** The Native VM hexagon, drawn from the app's own logo.svg. */
export function LogoMark({
  className,
  title,
  live = false,
}: {
  className?: string;
  title?: string;
  /** Blink the server lights, one after another. */
  live?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <polygon
        points="50,6 88.1,28 88.1,72 50,94 11.9,72 11.9,28"
        fill="#0d9488"
        stroke="#0d9488"
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <g fill="#ffffff">
        <rect x="26" y="29.5" width="48" height="12" rx="3.5" />
        <rect x="26" y="44" width="48" height="12" rx="3.5" />
        <rect x="26" y="58.5" width="48" height="12" rx="3.5" />
      </g>
      <g fill="#0f766e">
        <rect x="31.5" y="34" width="13" height="3" rx="1.5" />
        <rect x="31.5" y="48.5" width="13" height="3" rx="1.5" />
        <rect x="31.5" y="63" width="13" height="3" rx="1.5" />
      </g>
      <g fill="#16a34a">
        {[35.5, 50, 64.5].map((cy, index) => (
          <circle
            key={cy}
            cx="66"
            cy={cy}
            r="2.8"
            className={live ? "animate-blink" : undefined}
            style={live ? { animationDelay: `${index * 0.35}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
}

export function Wordmark({ className, dark = true }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-8 shrink-0" />
      <span
        className={cn(
          "text-[17px] font-bold tracking-[-0.01em]",
          dark ? "text-white" : "text-ink",
        )}
      >
        Native VM
      </span>
    </span>
  );
}
