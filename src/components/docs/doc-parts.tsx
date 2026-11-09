import {
  ArrowRight,
  Boxes,
  Download,
  Rocket,
  RotateCcw,
  Server,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
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

const startHere: { title: string; href: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Install Native VM",
    href: "/docs/installation",
    body: "The beta for macOS, Windows and Linux.",
    icon: Download,
  },
  {
    title: "Quick start",
    href: "/docs/quick-start",
    body: "From a bare server to a live app in one sitting.",
    icon: Rocket,
  },
  {
    title: "Connect a server",
    href: "/docs/servers",
    body: "Add a VPS by key or password, or import your SSH config.",
    icon: Server,
  },
  {
    title: "Create an app",
    href: "/docs/apps",
    body: "Pick a framework, then point at Git or a folder.",
    icon: Boxes,
  },
  {
    title: "Deploys and rollback",
    href: "/docs/deploys",
    body: "One-click deploys from Git, health checks and rolling back.",
    icon: RotateCcw,
  },
  {
    title: "Security model",
    href: "/docs/security",
    body: "What the app holds, and how it keeps it safe.",
    icon: ShieldCheck,
  },
];

/** The docs home's way in: the pages most people want first, as cards. */
export function StartHere() {
  return (
    <nav aria-label="Start here" className="my-9 grid gap-3 sm:grid-cols-2">
      {startHere.map(({ title, href, body, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="doc-card group relative flex items-start gap-4 border border-ink/12 bg-white p-4 transition-[border-color,box-shadow] duration-200 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-300 hover:border-accent/50 hover:shadow-[0_24px_50px_-32px_rgba(13,148,136,0.6)] hover:before:scale-x-100"
        >
          <span className="inline-flex size-9 shrink-0 items-center justify-center bg-ink text-white transition-colors group-hover:bg-accent">
            <Icon className="size-[18px]" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5 font-bold">
              {title}
              <ArrowRight
                className="size-3.5 text-accent-700 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
            <span className="mt-0.5 block text-[14px] leading-snug text-neutral-600">{body}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
