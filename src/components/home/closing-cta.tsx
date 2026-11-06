import { ArrowUpRight } from "lucide-react";

import { DownloadButton } from "@/components/download-button";
import { LogoMark } from "@/components/logo";
import { ButtonLink, DarkBandTexture, Pill } from "@/components/ui";
import { getRelease } from "@/lib/get-release";
import { site } from "@/lib/site";

export async function ClosingCta() {
  const { version, channel } = await getRelease();
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="glow-teal absolute top-1/2 left-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2"
      />
      <DarkBandTexture />
      <div className="reveal mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
        <LogoMark live className="size-16 drop-shadow-[0_10px_30px_rgba(13,148,136,0.6)]" />
        <h2 className="font-wide mt-8 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1] font-extrabold tracking-[-0.03em]">
          Ready when your servers are.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-white/65">
          Download the Native VM beta, sign in, and connect your first server. From a bare VPS to an
          app on HTTPS in one sitting.
        </p>
        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <DownloadButton />
          <ButtonLink href={site.account.register} external variant="outline-light" size="lg">
            Create a free account <ArrowUpRight aria-hidden />
          </ButtonLink>
        </div>
        <p className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-white/50">
          <Pill tone="beta">{channel}</Pill>
          <span>Version {version}</span>
          <span aria-hidden>·</span>
          <span>macOS, Windows and Linux</span>
        </p>
      </div>
    </section>
  );
}
