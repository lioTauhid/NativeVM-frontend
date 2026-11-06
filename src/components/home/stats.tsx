import { FrameworkBadge } from "@/components/framework-badge";
import { Container } from "@/components/ui";
import { frameworks } from "@/lib/frameworks";

const stats = [
  { value: "0", unit: "", label: "daemons or agents left running on your server between actions" },
  { value: "0", unit: "", label: "ports opened on your server for a control panel" },
  { value: "1", unit: "", label: "SSH connection per server, shared by every tab and transfer" },
  { value: "0.5", unit: "s", label: "to roll back: the previous release is still on disk, built" },
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
              className={`border-b border-ink/15 py-7 pr-6 lg:border-b-0 ${index > 0 ? "lg:border-l lg:pl-8" : ""} ${index % 2 === 1 ? "border-l border-ink/15 pl-5 lg:pl-8" : ""}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-wide block text-[clamp(2.75rem,5vw,4rem)] leading-none font-extrabold tracking-[-0.04em]">
                  {stat.value}
                  {stat.unit ? <span className="ml-1 text-accent">{stat.unit}</span> : null}
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
        <p className="kicker text-center">Bring the code you already have</p>
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
      </div>
    </section>
  );
}
