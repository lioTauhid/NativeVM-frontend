import { Check, DoorOpen, Gauge, TrendingUp, Zap, type LucideIcon } from "lucide-react";

import { Container, DarkBandTexture, Mark, SectionIntro } from "@/components/ui";

/** Each promise is something the docs back: see docs/security, docs/apps and docs/deploys. */
const reasons: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Gauge,
    title: "All of your server, for your apps",
    body: "No panel, agent or database of ours runs on your server. The CPU and memory you pay for go to your apps, not to the tool that manages them.",
  },
  {
    icon: Zap,
    title: "Zero added latency",
    body: "Native VM never sits between your visitors and your app. Requests go straight to your server and your code, as fast as it can answer them.",
  },
  {
    icon: TrendingUp,
    title: "Room to scale",
    body: "Run more apps on every server, each in its own account and on its own runtime version, with CPU and memory limits if you want them. Add servers as you grow.",
  },
  {
    icon: DoorOpen,
    title: "Freedom, not lock-in",
    body: "Any provider, any Ubuntu or Debian VPS. Your apps are ordinary Linux services that keep running whether Native VM is open or closed.",
  },
];

/** A sample server's memory, the one from the screenshots: every byte in use is an app's. */
const totalGb = 8;
const apps = [
  { name: "kestrel-api", gb: 1.5, tone: "bg-accent-700" },
  { name: "kestrel-admin", gb: 0.9, tone: "bg-accent" },
  { name: "order-worker", gb: 0.7, tone: "bg-accent-400" },
  { name: "docs", gb: 0.3, tone: "bg-accent-200" },
];
const free = "bg-[repeating-linear-gradient(135deg,#ffffff_0_5px,#eae7e7_5px_7px)]";

function ServerCard() {
  const used = apps.reduce((sum, app) => sum + app.gb, 0);
  return (
    <figure className="m-0">
      <div className="border border-white/12 bg-white text-ink shadow-[0_40px_90px_-40px_rgba(13,148,136,0.55)]">
        <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-5 py-3.5">
          <p className="flex items-center gap-2 font-semibold">
            <Mark tone="ok" className="text-accent" /> kestrel-prod-01
          </p>
          <p className="text-[13px] text-neutral-600">4 vCPU · {totalGb} GB</p>
        </div>

        <div className="px-5 pt-5 pb-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="kicker">Memory</p>
            <p className="text-[13px] text-neutral-600">
              <span className="font-semibold text-ink">{used.toFixed(1)} GB</span> in use, all of it
              your apps
            </p>
          </div>
          <div aria-hidden className="mt-3 flex h-9 gap-px border border-ink/15 bg-ink/15">
            {apps.map((app) => (
              <span
                key={app.name}
                className={app.tone}
                style={{ width: `${(app.gb / totalGb) * 100}%` }}
              />
            ))}
            <span className={`flex-1 ${free}`} />
          </div>
          <ul className="mt-4 grid gap-x-6 gap-y-2 text-[13px] sm:grid-cols-2">
            {apps.map((app) => (
              <li key={app.name} className="flex items-center gap-2">
                <span aria-hidden className={`size-2.5 shrink-0 ${app.tone}`} />
                <span className="min-w-0 truncate">{app.name}</span>
                <span className="ml-auto text-neutral-600">{app.gb.toFixed(1)} GB</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden className={`size-2.5 shrink-0 border border-ink/25 ${free}`} />
              <span className="min-w-0 truncate">Room for more</span>
              <span className="ml-auto text-neutral-600">{(totalGb - used).toFixed(1)} GB</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-ink/10 bg-bg px-5 py-3.5 text-sm">
          <span className="font-semibold">Native VM, between your actions</span>
          <span className="flex items-center gap-1.5 font-semibold text-accent-700">
            <Check className="size-4" aria-hidden /> Nothing running
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-white/55">
        A sample server. Everything running on it is yours.
      </figcaption>
    </figure>
  );
}

/** Why your own VPS, run by Native VM: the resources, the speed, the room, the freedom. */
export function Why() {
  return (
    <section
      id="why"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-24 text-white sm:py-32"
    >
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="glow-teal absolute top-1/2 -left-48 -z-10 h-[520px] w-[720px] -translate-y-1/2 opacity-50"
      />
      <DarkBandTexture />
      <Container>
        <SectionIntro
          dark
          kicker="Why Native VM"
          className="max-w-4xl"
          title={
            // Each phrase stays whole: lines break only between them.
            <>
              <span className="whitespace-nowrap">Your VPS.</span>{" "}
              <span className="whitespace-nowrap">Your resources.</span>{" "}
              <span className="text-gradient whitespace-nowrap">Your freedom.</span>
            </>
          }
        >
          <p className="max-w-2xl">
            You already pay for the server. Native VM makes sure you get all of it: nothing of ours
            runs on it, nothing sits in front of it, and nothing ties you to us.
          </p>
        </SectionIntro>

        {/* grid-cols-1 keeps the phone column at the page's width. */}
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="reveal">
            <ServerCard />
          </div>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }) => (
              <li key={title} className="reveal border-t border-white/15 pt-6">
                <span className="inline-flex size-10 items-center justify-center border border-accent-400/40 text-accent-400">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-[-0.01em]">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
