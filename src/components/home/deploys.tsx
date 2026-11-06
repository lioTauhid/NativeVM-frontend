import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container, SectionIntro } from "@/components/ui";
import { WindowFrame } from "@/components/window-frame";
import { cn } from "@/lib/cn";

const stages = [
  { name: "Fetch", hidden: true },
  { name: "Export", hidden: true },
  { name: "Install", hidden: true },
  { name: "Build", hidden: true },
  { name: "Check", hidden: true },
  { name: "Switch", hidden: false },
  { name: "Restart", hidden: false },
  { name: "Verify", hidden: false },
];

export function Deploys() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="glow-teal absolute top-1/3 -right-40 -z-10 h-[520px] w-[720px] opacity-60"
      />
      <Container>
        <SectionIntro
          dark
          kicker="Deploys"
          className="max-w-4xl"
          title={
            <>
              Every deploy is a new release.{" "}
              <span className="text-gradient">Rollback is a rename.</span>
            </>
          }
        >
          <p className="max-w-2xl">
            Everything slow and everything that can fail happens in a directory the running app
            can&apos;t see. A failed build costs disk space, never downtime.
          </p>
        </SectionIntro>

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <ol className="reveal flex flex-wrap gap-y-3" aria-label="The deploy sequence">
              {stages.map((stage, index) => (
                <li key={stage.name} className="flex items-center">
                  <span
                    className={cn(
                      "px-2.5 py-1.5 text-[13px] font-semibold",
                      stage.name === "Switch"
                        ? "bg-accent text-white"
                        : stage.hidden
                          ? "border border-white/15 text-white/70"
                          : "border border-accent-400/50 text-accent-200",
                    )}
                  >
                    {stage.name}
                  </span>
                  {index < stages.length - 1 ? (
                    <span aria-hidden className="mx-1.5 h-px w-3 bg-white/25" />
                  ) : null}
                </li>
              ))}
            </ol>

            <pre
              className="reveal mt-8 overflow-x-auto border border-white/10 bg-black/30 p-5 font-mono text-[12.5px] leading-[1.85] text-white/80"
              aria-label="An app's directory on the server"
            >
              <span className="text-white">/srv/shop/</span>
              {"\n"}
              {"├─ "}
              <span className="text-white">repo/</span>
              <span className="text-white/40">{"                 a bare mirror, fetched into"}</span>
              {"\n├─ "}
              <span className="text-white">releases/</span>
              {"\n│  ├─ 20261103T141204Z-b82d1e4/"}
              <span className="text-white/40">{"  still built: roll back to it"}</span>
              {"\n│  └─ 20261106T091512Z-4e81d07/"}
              <span className="text-accent-400">{"  ← built, checked, switched to"}</span>
              {"\n├─ "}
              <span className="text-white">shared/</span>
              <span className="text-white/40">{"               .env, and what outlives a release"}</span>
              {"\n└─ "}
              <span className="text-accent-400">current</span>
              {" → releases/20261106T091512Z-4e81d07"}
            </pre>

            <ul className="reveal mt-8 space-y-4 text-[15px] leading-relaxed text-white/70">
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent-400" />
                <span>
                  <strong className="text-white">Up means answering.</strong> After the restart,
                  Native VM connects to the app&apos;s socket or port. A process that exits or binds
                  nothing is a failed deploy.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent-400" />
                <span>
                  <strong className="text-white">It puts itself back.</strong> If the new release
                  doesn&apos;t come up, <code className="font-mono text-accent-200">current</code>{" "}
                  points at the one that was working a second ago, and the service restarts on it.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent-400" />
                <span>
                  <strong className="text-white">Five releases kept.</strong> Rolling back is one
                  button beside any of them: no rebuild, no re-fetch.
                </span>
              </li>
            </ul>

            <Link
              href="/docs/deploys"
              className="reveal mt-9 inline-flex items-center gap-2 font-semibold text-accent-400 hover:text-white"
            >
              How deploys work <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="reveal">
            <WindowFrame name="appDeploying" sizes="(min-width: 1024px) 700px, 100vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}
