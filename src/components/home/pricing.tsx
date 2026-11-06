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
      <p className={cn("mt-3 text-[15px] leading-relaxed", dark ? "text-white/65" : "text-neutral-700")}>
        {blurb}
      </p>
      <ul className={cn("mt-7 flex-1 divide-y", dark ? "divide-white/10" : "divide-ink/10")}>
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
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-bg py-24 sm:py-32">
      <Container>
        <SectionIntro kicker="Plans" title="Start free. Go Pro when the fleet grows." align="center">
          <p>
            Native VM is used with a Native VM account. The free plan covers a couple of servers end
            to end; Pro lifts every limit and unlocks Advanced mode.
          </p>
        </SectionIntro>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          <Plan name="Free" plan="free" blurb="For a side project, a client site or two: everything you need to deploy, secure and run them.">
            <ButtonLink href={site.account.register} external variant="secondary" className="w-full">
              Create a free account <ArrowUpRight aria-hidden />
            </ButtonLink>
          </Plan>
          <Plan
            name="Pro"
            plan="pro"
            dark
            blurb="For production fleets: unlimited servers, apps and cron jobs, every service on the box, and private repositories."
          >
            <ButtonLink href={site.account.upgrade} external className="w-full">
              Upgrade to Pro <ArrowUpRight aria-hidden />
            </ButtonLink>
          </Plan>
        </div>
        <p className="reveal mx-auto mt-8 max-w-2xl text-center text-sm text-neutral-600">
          Accounts and plans are managed on toolxbd.com. The app checks your plan each time it starts,
          and again whenever you choose <em>Check my plan again</em> from the account menu.
        </p>
      </Container>
    </section>
  );
}
