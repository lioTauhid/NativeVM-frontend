import { ArrowRight, HeartPulse, RotateCcw, Undo2, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { RedeployDemo } from "@/components/home/redeploy-demo";
import { Container, DarkBandTexture, SectionIntro } from "@/components/ui";
import { WindowFrame } from "@/components/window-frame";

const promises: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: HeartPulse,
    title: "Checked before it goes live",
    body: "A new release only takes over once your app is up and answering. Until then, visitors keep the version that works.",
  },
  {
    icon: Undo2,
    title: "Puts itself back",
    body: "If the new version doesn't start, Native VM switches straight back to the one before. A failed build never takes your site down.",
  },
  {
    icon: RotateCcw,
    title: "Roll back in one click",
    body: "Your last five releases stay on the server, ready to run. Going back to one takes about half a second.",
  },
];

/** One-click CI/CD: push to Git, press Re-Deploy. */
export function Deploys() {
  return (
    <section
      id="deploy"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-24 text-white sm:py-32"
    >
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="glow-teal absolute top-1/3 -right-40 -z-10 h-[520px] w-[720px] opacity-60"
      />
      <DarkBandTexture />
      <Container>
        <SectionIntro
          dark
          kicker="One-click CI/CD"
          className="max-w-4xl"
          title={
            <>
              Push to Git. Click <span className="whitespace-nowrap">Re-Deploy.</span>{" "}
              <span className="text-gradient">You&apos;re live.</span>
            </>
          }
        >
          <p className="max-w-2xl">
            Connect your repository once. After that, shipping is one button: Native VM pulls the
            newest commit, builds it, checks it&apos;s healthy and switches over, with the same
            settings every time. No pipeline to write, and no YAML.
          </p>
        </SectionIntro>

        {/* grid-cols-1 caps the phone column at the page's width; the demo's lines don't wrap. */}
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className="reveal">
            <RedeployDemo />
          </div>
          <div className="reveal">
            <WindowFrame name="appDeploys" sizes="(min-width: 1024px) 700px, 100vw">
              {/* The real Re-Deploy button, in the app page's header. */}
              <span
                aria-hidden
                className="animate-nudge absolute top-[14.8%] left-[84.7%] h-[4.4%] w-[9.4%] outline-2 outline-offset-2 outline-accent-400"
              />
            </WindowFrame>
            <p className="mt-3 text-sm text-white/55">
              In the app: Re-Deploy sits in every app&apos;s header, and the Deploys tab keeps the
              releases you can roll back to.
            </p>
          </div>
        </div>

        <ul className="mt-16 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {promises.map(({ icon: Icon, title, body }) => (
            <li key={title} className="reveal bg-ink p-7">
              <Icon className="size-5 text-accent-400" aria-hidden />
              <h3 className="mt-4 text-lg font-bold tracking-[-0.01em]">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{body}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/docs/deploys"
          className="reveal mt-10 inline-flex items-center gap-2 font-semibold text-accent-400 hover:text-white"
        >
          How deploys work <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Container>
    </section>
  );
}
