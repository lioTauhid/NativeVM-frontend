import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FrameworkBadge } from "@/components/framework-badge";
import { Container, SectionIntro } from "@/components/ui";
import { frameworks, runtimeVersions } from "@/lib/frameworks";

export function Frameworks() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro kicker="Frameworks" title="Pick a framework. Native VM does the rest.">
            <p>
              Point it at a Git repository or a folder on your computer. Native VM reads what&apos;s
              there, warns you before the deploy if something&apos;s missing, and writes the service
              and the web server for it.
            </p>
          </SectionIntro>
          <Link
            href="/docs/frameworks"
            className="reveal inline-flex shrink-0 items-center gap-2 font-semibold text-accent-700 hover:text-ink"
          >
            Frameworks and runtimes <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-t border-l border-ink/12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {frameworks.map((framework) => (
            <li
              key={framework.key}
              className="reveal group relative border-r border-b border-ink/12 bg-white p-5 transition-colors hover:bg-bg"
            >
              <FrameworkBadge
                framework={framework}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <p className="mt-4 font-bold tracking-[-0.01em]">{framework.label}</p>
              <p className="kicker mt-1 text-[10.5px]">{framework.runtime}</p>
              <p className="mt-2 text-[13px] leading-snug text-neutral-600">{framework.summary}</p>
            </li>
          ))}
        </ul>

        <div className="reveal mt-10 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {runtimeVersions.map((line) => (
            <div key={line.runtime} className="bg-white p-5">
              <p className="kicker">{line.runtime}</p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {line.versions.map((version, index) => (
                  <span
                    key={version}
                    className={
                      index === 0
                        ? "bg-ink px-2 py-0.5 text-sm font-semibold text-white"
                        : "border border-ink/20 px-2 py-0.5 text-sm font-semibold"
                    }
                  >
                    {version}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
        <p className="reveal mt-4 text-sm text-neutral-600">
          Runtimes are installed per app, never globally, so two apps on one server can run different
          versions side by side. Go, and self-contained .NET or Java builds, bring their own.
        </p>
      </Container>
    </section>
  );
}
