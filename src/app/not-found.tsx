import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { MissingPath } from "@/components/missing-path";
import { ButtonLink, DarkBandTexture, Mark } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

/** The steps of a "deploy" of this address, as the app's log pane would show them. */
const steps = [
  { step: "Fetch the page", result: "not found", alert: true },
  { step: "Start and check it is up", result: "404", alert: true },
  { step: "Roll back", result: "no earlier release", alert: false },
];

export default function NotFound() {
  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden className="bg-spotlight absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <DarkBandTexture edge={false} />
      <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <p className="kicker inline-flex items-center gap-2 text-alert-400">
          <Mark tone="alert" /> 404 · Not found
        </p>
        <h1 className="font-wide mt-6 text-[clamp(2.4rem,6vw,4.25rem)] leading-[1] font-extrabold tracking-[-0.03em]">
          This page didn&apos;t come up.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/65">
          Unlike a deploy, there&apos;s no previous release to roll back to. These should help:
        </p>

        <div className="mx-auto mt-9 max-w-lg border border-white/10 bg-black/30 text-left font-mono text-[12.5px] leading-[1.9]">
          <p className="flex items-center gap-2 border-b border-white/10 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.1em] text-white/45 uppercase">
            <Mark tone="alert" /> Deploy · <span className="truncate normal-case">
              <MissingPath />
            </span>
          </p>
          <ol className="px-4 py-3">
            {steps.map((item, index) => (
              <li key={item.step} className="flex items-baseline gap-3">
                <span className="text-white/30">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 truncate text-white/75">{item.step}</span>
                <span className={item.alert ? "text-alert-400" : "text-white/45"}>{item.result}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the home page</ButtonLink>
          <ButtonLink href="/docs" variant="outline-light">
            Read the docs <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-white/45">
          Looking for the app?{" "}
          <Link href="/download" className="underline underline-offset-4 hover:text-white">
            Download Native VM
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
