import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FrameworkBadge } from "@/components/framework-badge";
import { Container } from "@/components/ui";
import { frameworks } from "@/lib/frameworks";

const stats = [
  { value: "1", unit: "click", label: "to deploy your newest commit, with Re-Deploy" },
  { value: "0", unit: "", label: "server credentials collected: keys, passwords and tokens stay with you" },
  { value: "0.5", unit: "s", label: "to roll back to the release before, if one misbehaves" },
  { value: "3", unit: "", label: "desktop platforms in beta: macOS, Windows and Linux" },
];

export function Stats() {
  const marquee = frameworks.filter((item) => item.key !== "other");
  return (
    <section aria-label="Native VM in numbers" className="bg-bg pt-16 sm:pt-20">
      <Container>
        <dl className="reveal grid grid-cols-2 border-t-2 border-ink lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative border-b border-ink/15 py-7 pr-6 lg:border-b-0 lg:before:absolute lg:before:-top-[2px] lg:before:h-[2px] lg:before:w-14 lg:before:bg-accent ${index > 0 ? "lg:border-l lg:pl-8 lg:before:left-8" : "lg:before:left-0"} ${index % 2 === 1 ? "border-l border-ink/15 pl-5 lg:pl-8" : ""}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-wide block text-[clamp(2.75rem,5vw,4rem)] leading-none font-extrabold tracking-[-0.04em]">
                  {stat.value}
                  {stat.unit ? (
                    <span className="ml-1.5 text-[0.5em] tracking-[-0.02em] text-accent">{stat.unit}</span>
                  ) : null}
                </span>
                <span className="mt-3 block max-w-[15rem] text-[15px] leading-snug text-neutral-700">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <div className="mt-16 border-y border-ink/10 bg-white/60 py-7 sm:mt-20">
        <p className="kicker text-center">Pick your framework. Native VM does the rest.</p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <ul className="animate-marquee flex w-max gap-10 pr-10 hover:[animation-play-state:paused]">
            {[...marquee, ...marquee].map((framework, index) => (
              <li
                key={`${framework.key}-${index}`}
                aria-hidden={index >= marquee.length}
                className="flex items-center gap-3"
              >
                <FrameworkBadge framework={framework} className="size-9" />
                <span className="text-lg font-bold tracking-[-0.01em] whitespace-nowrap">
                  {framework.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center">
          <Link
            href="/docs/frameworks"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-ink"
          >
            Every framework and runtime <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
