import { ArrowUpRight, Check, Minus } from "lucide-react";

import { ButtonLink, Container, Pill, SectionIntro } from "@/components/ui";
import { cn } from "@/lib/cn";
import { planRows, type PlanRow } from "@/lib/plans";
import { site } from "@/lib/site";

function Value({ value, dark }: { value: PlanRow["free"]; dark?: boolean }) {
  if (value === true) {
    return <Check className={cn("size-[18px]", dark ? "text-accent-400" : "text-accent")} aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className={cn("size-[18px]", dark ? "text-white/30" : "text-neutral-400")} aria-label="Not included" />;
  }
  return <span className="font-semibold">{value}</span>;
}

function Plan({
  name,
  blurb,
  plan,
  dark = false,
  children,
}: {
  name: string;
  blurb: string;
  plan: "free" | "pro";
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "reveal relative flex flex-col p-7 sm:p-9",
        dark
          ? "bg-ink text-white shadow-[0_40px_100px_-40px_rgba(13,148,136,0.6)]"
          : "border border-ink/15 bg-white",
      )}
    >
      {dark ? (
        <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent via-accent-400 to-accent-200" />
      ) : null}
      <div className="flex items-center gap-3">
        <h3 className="font-wide text-3xl font-extrabold tracking-[-0.03em]">{name}</h3>
        {dark ? <Pill tone="accent">Everything</Pill> : null}
      </div>
      {/* Three lines tall on wide screens, so both plans' buttons sit level. */}
      <p
        className={cn(
          "mt-3 text-[15px] leading-relaxed lg:min-h-[3lh]",
          dark ? "text-white/65" : "text-neutral-700",
        )}
      >
        {blurb}
      </p>
      <div className="mt-6">{children}</div>
      <p className={cn("kicker mt-9", dark && "text-white/45")}>What&apos;s included</p>
      <ul className={cn("mt-2 flex-1 divide-y", dark ? "divide-white/10" : "divide-ink/10")}>
        {planRows.map((row) => (
          <li key={row.feature} className="flex items-center justify-between gap-4 py-3">
            <span className="text-[15px]">
              {row.feature}
              {row.detail ? (
                <span className={cn("block text-[13px]", dark ? "text-white/45" : "text-neutral-500")}>
                  {row.detail}
                </span>
              ) : null}
            </span>
            <Value value={row[plan]} dark={dark} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative isolate scroll-mt-20 overflow-hidden bg-bg py-24 sm:py-32">
      <div aria-hidden className="bg-grid-ink absolute inset-x-0 top-0 -z-10 h-[560px]" />
      <Container>
        <SectionIntro kicker="Plans" title="Start free. Go Pro when the fleet grows." align="center">
          <p>
            Every plan includes one-click deploys, free HTTPS and the same security: your
            credentials stay on your computer either way. Pro lifts every limit and unlocks Advanced
            mode.
          </p>
        </SectionIntro>

        <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          <div
            aria-hidden
            className="glow-teal absolute top-16 -right-28 -z-10 hidden h-[460px] w-[600px] opacity-40 lg:block"
          />
          <Plan name="Free" plan="free" blurb="For a side project, a client site or two: everything you need to deploy, secure and run them.">
            <ButtonLink href={site.account.register} external variant="secondary" className="w-full">
              Create a free account <ArrowUpRight aria-hidden />
            </ButtonLink>
          </Plan>
          <Plan
            name="Pro"
            plan="pro"
            dark
            blurb="For production fleets: unlimited servers, apps and scheduled jobs, every service on the server, and private repositories."
          >
            <ButtonLink href={site.account.upgrade} external className="w-full">
              Upgrade to Pro <ArrowUpRight aria-hidden />
            </ButtonLink>
          </Plan>
        </div>
        <p className="reveal mx-auto mt-8 max-w-2xl text-center text-sm text-neutral-600">
          Plans are bought and managed in your account on toolxbd.com. Your apps keep running
          whatever plan you&apos;re on.
        </p>
      </Container>
    </section>
  );
}
