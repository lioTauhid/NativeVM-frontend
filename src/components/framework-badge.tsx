import { CodeXml, FileCode, FlaskConical, Hexagon, Leaf, Zap } from "lucide-react";

import { cn } from "@/lib/cn";
import type { Framework } from "@/lib/frameworks";

const icons = {
  zap: Zap,
  "flask-conical": FlaskConical,
  hexagon: Hexagon,
  "file-code": FileCode,
  leaf: Leaf,
  "code-xml": CodeXml,
} as const;

/** A framework's badge as the wizard draws it: a colour and a monogram or glyph. */
export function FrameworkBadge({
  framework,
  className,
}: {
  framework: Framework;
  className?: string;
}) {
  const Icon = framework.icon ? icons[framework.icon] : null;
  const outlined = framework.colour === "transparent";
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center font-extrabold tracking-[-0.03em]",
        outlined ? "border-[1.5px] border-ink/70 text-ink" : "text-white",
        className,
      )}
      style={outlined ? undefined : { backgroundColor: framework.colour }}
    >
      {Icon ? (
        <Icon className="size-[46%]" strokeWidth={2.25} />
      ) : (
        <span className={cn(framework.monogram && framework.monogram.length > 2 ? "text-[15px]" : "text-[19px]")}>
          {framework.monogram}
        </span>
      )}
    </span>
  );
}
