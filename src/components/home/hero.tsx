import { ArrowRight, Download, RotateCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { ButtonLink, Mark } from "@/components/ui";
import { WindowFrame } from "@/components/window-frame";
import { platform, version } from "@/lib/release";

export function Hero() {
  const mac = platform("macos-arm64");
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="glow-teal absolute top-[46%] left-1/2 -z-10 h-[560px] w-[min(1100px,120vw)] -translate-x-1/2 opacity-80"
      />
      {/* The light page starts under the screenshot, so the window straddles both. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[16%] bg-bg sm:h-[22%]" />

      <div className="mx-auto w-full max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <Link
            href="/download"
            className="animate-rise inline-flex items-center gap-2.5 border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/75 backdrop-blur transition-colors hover:border-accent-400/60 hover:text-white"
          >
            <Mark tone="busy" />
            Version {version} is here for macOS
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>

          <h1 className="font-wide animate-rise mt-7 text-[clamp(2.5rem,7vw,5.6rem)] leading-[0.94] font-extrabold tracking-[-0.035em]">
            Your own servers,
            <br />
            <span className="text-gradient">run from your desk.</span>
          </h1>

          <p className="animate-rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/68 [animation-delay:160ms] sm:text-xl">
            Native VM is a desktop app that deploys and runs your Node.js, Python, Go, .NET and Java
            apps on a bare Ubuntu or Debian server. It works over SSH alone: no panel on the server,
            no daemon, no open port.
          </p>

          <div className="animate-rise mt-9 flex flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href="/download" size="lg" className="w-full sm:w-auto">
              <Download aria-hidden /> Download for macOS
            </ButtonLink>
            <ButtonLink
              href="/docs/quick-start"
              variant="outline-light"
              size="lg"
              className="w-full sm:w-auto"
            >
              Read the quick start
              <ArrowRight
                aria-hidden
                className="transition-transform group-hover/button:translate-x-0.5"
              />
            </ButtonLink>
          </div>
          <p className="animate-rise mt-5 text-[13px] text-white/45 [animation-delay:300ms]">
            Free plan available · {mac.requirement} · Windows and Linux coming soon
          </p>
        </div>

        {/* No fade on the screenshot: it is the largest thing painted, so it shows at once. */}
        <div className="relative mx-auto mt-14 max-w-6xl sm:mt-20">
          <WindowFrame name="overview" eager sizes="(min-width: 1200px) 1152px, 96vw" />

          <div className="animate-float absolute top-[30%] -left-6 hidden w-72 border border-ink/10 bg-white p-4 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] lg:block xl:-left-14">
            <p className="kicker flex items-center gap-2 text-accent-700">
              <Mark tone="ok" className="text-accent" /> Deployed
            </p>
            <p className="mt-2 font-semibold">kestrel-api · main @ 4e81d07</p>
            <p className="mt-1 text-sm text-neutral-600">
              Answered on its port, then switched. The release before it stays on disk.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
              <RotateCcw className="size-3.5" aria-hidden /> Roll back in one click
            </p>
          </div>

          <div className="animate-float absolute -right-6 bottom-[22%] hidden w-64 border border-white/15 bg-ink/90 p-4 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur [animation-delay:-3s] lg:block xl:-right-12">
            <p className="kicker flex items-center gap-2 text-accent-400">
              <ShieldCheck className="size-3.5" aria-hidden /> HTTPS
            </p>
            <p className="mt-2 font-semibold">api.kestrel.shop</p>
            <div className="mt-3 h-1.5 bg-white/10">
              <div className="h-full w-[82%] bg-accent-400" />
            </div>
            <p className="mt-2 text-sm text-white/60">Valid for 74 days · renews on the server</p>
          </div>
        </div>
      </div>
    </section>
  );
}
