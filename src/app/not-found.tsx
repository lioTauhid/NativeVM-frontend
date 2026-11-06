import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink, Mark } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-ink py-28 text-white">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
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
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the home page</ButtonLink>
          <ButtonLink href="/docs" variant="outline-light">
            Read the docs <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-white/45">
          Looking for the app? <Link href="/download" className="underline underline-offset-4 hover:text-white">Download Native VM</Link>.
        </p>
      </div>
    </main>
  );
}
