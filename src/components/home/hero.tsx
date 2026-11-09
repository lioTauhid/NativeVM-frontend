import { ArrowRight, Check, GitCommitHorizontal, LockKeyhole, Rocket } from "lucide-react";
import Link from "next/link";

import { DownloadButton } from "@/components/download-button";
import { ButtonLink, DarkBandTexture, Mark } from "@/components/ui";
import { WindowFrame } from "@/components/window-frame";
import { getRelease } from "@/lib/get-release";

const promises = [
  "Beta for macOS, Windows and Linux",
  "Free plan to start",
  "Your credentials stay on your computer",
];

const keptLocally = ["SSH keys", "Server passwords", "Git tokens"];

export async function Hero() {
  const { version } = await getRelease();
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="glow-teal absolute top-[46%] left-1/2 -z-10 h-[560px] w-[min(1100px,120vw)] -translate-x-1/2 opacity-80"
      />
      <div aria-hidden className="bg-spotlight absolute inset-x-0 top-0 -z-10 h-[620px]" />
      <DarkBandTexture edge={false} />
      {/* The light page starts under the screenshot, so the window straddles both. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[16%] bg-bg sm:h-[22%]" />

      <div className="mx-auto w-full max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <Link
            href="/download"
            className="animate-rise inline-flex items-center gap-2.5 border border-white/15 bg-white/[0.04] py-1.5 pr-3.5 pl-1.5 text-[13px] text-white/75 backdrop-blur transition-colors hover:border-accent-400/60 hover:text-white"
          >
            <span className="bg-accent px-1.5 py-0.5 text-[10.5px] font-semibold tracking-[0.12em] text-white uppercase">
              Beta
            </span>
            <span>
              Version {version}
              <span className="hidden sm:inline"> for macOS, Windows and Linux</span>
            </span>
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>

          <h1 className="font-wide animate-rise mt-7 text-[clamp(2.5rem,7vw,5.6rem)] leading-[0.94] font-extrabold tracking-[-0.035em]">
            Your own servers,
            <br />
            <span className="text-gradient">run from your desk.</span>
          </h1>

          <p className="animate-rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/68 [animation-delay:160ms] sm:text-xl">
            Native VM is the desktop app that sets up your server, deploys your apps and keeps them
            running. Push to Git, click Deploy, and you&apos;re live. Your keys and passwords never
            leave your computer.
          </p>

          <div className="animate-rise mt-9 flex flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
            <DownloadButton className="w-full sm:w-auto" />
            <ButtonLink
              href="/#how-it-works"
              variant="outline-light"
              size="lg"
              className="w-full sm:w-auto"
            >
              See how it works
              <ArrowRight
                aria-hidden
                className="transition-transform group-hover/button:translate-x-0.5"
              />
            </ButtonLink>
          </div>
          <ul className="animate-rise mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/55 [animation-delay:300ms]">
            {promises.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-accent-400" aria-hidden /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* No fade on the screenshot: it is the largest thing painted, so it shows at once. */}
        <div className="relative mx-auto mt-14 max-w-6xl sm:mt-20">
          <WindowFrame name="overview" eager sizes="(min-width: 1200px) 1152px, 96vw" />

          {/* Two cards over the window say what the paragraph above says: decoration only. */}
          <div
            aria-hidden
            className="animate-float absolute top-[24%] -left-6 hidden w-72 border border-ink/10 bg-white p-4 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] lg:block xl:-left-14"
          >
            <p className="kicker flex items-center gap-2 text-accent-700">
              <GitCommitHorizontal className="size-3.5" /> New commit on main
            </p>
            <p className="mt-2 font-semibold">Show delivery estimates</p>
            <p className="mt-0.5 font-mono text-[12px] text-neutral-600">kestrel-api · 4e81d07</p>
            <p className="mt-4 flex h-9 items-center justify-center gap-2 bg-accent text-sm font-semibold text-white">
              Deploy <Rocket className="size-3.5" />
            </p>
            <p className="mt-3 flex items-center gap-2 text-[13px] text-neutral-600">
              <Mark tone="ok" className="text-accent" /> Built, checked and live in one click
            </p>
          </div>

          <div
            aria-hidden
            className="animate-float absolute -right-6 bottom-[20%] hidden w-64 border border-white/15 bg-ink/90 p-4 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur [animation-delay:-3s] lg:block xl:-right-12"
          >
            <p className="kicker flex items-center gap-2 text-accent-400">
              <LockKeyhole className="size-3.5" /> On this computer only
            </p>
            <ul className="mt-2.5 divide-y divide-white/10 text-sm">
              {keptLocally.map((item) => (
                <li key={item} className="flex items-center justify-between py-1.5">
                  {item}
                  <span className="text-xs text-white/45">Keychain</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[13px] text-white/60">Never sent to us. Never collected.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
