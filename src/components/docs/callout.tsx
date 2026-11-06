import { Info, Lightbulb, Lock, TriangleExclamationPoint, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CalloutType = "note" | "tip" | "warning" | "pro";

const kinds: Record<CalloutType, { icon: LucideIcon; label: string; box: string; mark: string }> = {
  note: { icon: Info, label: "Note", box: "border-ink/25 bg-white", mark: "text-ink" },
  tip: { icon: Lightbulb, label: "Tip", box: "border-accent/60 bg-accent-100/70", mark: "text-accent-700" },
  warning: {
    icon: TriangleExclamationPoint,
    label: "Careful",
    box: "border-alert/60 bg-alert-100",
    mark: "text-alert-700",
  },
  pro: { icon: Lock, label: "Pro plan", box: "border-ink bg-white", mark: "text-ink" },
};

/** A note set apart from the text, with a 3px rule down its left edge. */
export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const kind = kinds[type];
  const Icon = kind.icon;
  return (
    <aside
      className={cn(
        "relative my-6 border border-l-[3px] px-5 py-4 text-[15px] leading-relaxed [&_p:last-child]:mb-0",
        kind.box,
      )}
    >
      <p className={cn("mb-1.5! flex items-center gap-2 font-bold", kind.mark)}>
        <Icon className="size-4 shrink-0" aria-hidden />
        {title ?? kind.label}
      </p>
      {children}
    </aside>
  );
}
