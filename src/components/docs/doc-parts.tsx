import type { ReactNode } from "react";

import { WindowFrame } from "@/components/window-frame";
import type { ScreenName } from "@/lib/screens";

/** Numbered steps: each h3 inside becomes a step with a large number beside it. */
export function Steps({ children }: { children: ReactNode }) {
  return <div className="docs-steps">{children}</div>;
}

/** A screenshot of the app, framed as a window, with an optional caption. */
export function Screenshot({ name, caption }: { name: ScreenName; caption?: string }) {
  return (
    <div className="not-prose my-8">
      <WindowFrame name={name} tone="light" caption={caption} sizes="(min-width: 1024px) 736px, 100vw" />
    </div>
  );
}

/** A row of short facts, each a label over a value. */
export function Facts({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="my-6 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="bg-white px-4 py-3">
          <dt className="kicker">{item.label}</dt>
          <dd className="mt-1 text-[15px] font-semibold">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
