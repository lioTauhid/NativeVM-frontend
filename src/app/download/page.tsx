import { ArrowRight, Check, Download, Monitor, Server } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { OsBadge } from "@/components/download/os-badge";
import { RecommendedDownload } from "@/components/download/recommended-download";
import { Container, Kicker, Mark, Pill } from "@/components/ui";
import { cn } from "@/lib/cn";
import { downloadUrl, platforms, supportedServers, version } from "@/lib/release";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Native VM for macOS on Apple silicon. Windows and Linux builds are on the way.",
};

const installSteps: { os: string; available: boolean; steps: React.ReactNode[] }[] = [
  {
    os: "macOS",
    available: true,
    steps: [
      <>
        Open <code>NativeVM-{version}-macos-arm64.dmg</code> and drag <strong>Native VM</strong>{" "}
        into <strong>Applications</strong>.
      </>,
      <>
        Open it from Applications. This first release isn&apos;t notarized by Apple yet, so macOS may
        say it can&apos;t check the app: open <strong>System Settings → Privacy &amp; Security</strong>{" "}
        and choose <strong>Open Anyway</strong>. You only do this once.
      </>,
      <>
        Sign in with your Native VM account, or choose <strong>Create an account</strong>.
      </>,
    ],
  },
  {
    os: "Windows",
    available: false,
    steps: [
      <>
        Run <code>NativeVM-{version}-windows-x64-setup.exe</code>. It installs for your user with no
        administrator prompt; the installer also offers <strong>all users</strong>.
      </>,
      <>
        Or unzip the portable <code>.zip</code> anywhere and run <code>Native VM.exe</code>.
      </>,
      <>Uninstalling keeps your data folder and the credentials in Windows Credential Manager.</>,
    ],
  },
  {
    os: "Linux",
    available: false,
    steps: [
      <>
        Install the package: <code>sudo apt install ./nativevm_{version}_amd64.deb</code>
      </>,
      <>
        Open <strong>Native VM</strong> from your applications menu, or run <code>nativevm</code>.
      </>,
      <>
        Or extract the portable <code>.tar.gz</code> and run <code>nativevm/nativevm</code>.
      </>,
    ],
  },
];

const releaseNotes = [
  "Connect Ubuntu 22.04, 24.04 and Debian 12 servers with a key or a password, or import them from ~/.ssh/config, with jump hosts.",
  "A New app wizard for Django, FastAPI, Flask, Express, Next.js, Node.js, static sites, Go, ASP.NET Core, Spring Boot and OpenClaw, from Git or a folder on your computer.",
  "Release-based deploys with a health check, automatic rollback and one-click rollback to any of the last five releases.",
  "Domains, preview ports and Let's Encrypt certificates, with a DNS check from the server and renewal on the server.",
  "Live metrics, services and logs, cron jobs as systemd timers, a file manager, terminals and Live Monitor.",
  "An Uninstaller that plans each removal and removes exactly what it showed you.",
];

export default function DownloadPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="glow-teal absolute top-1/2 right-[-10%] -z-10 h-[520px] w-[760px] -translate-y-1/2 opacity-70"
        />
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p className="kicker flex items-center gap-2 text-accent-400">
              <Mark tone="busy" /> Download · Version {version}
            </p>
            <h1 className="font-wide animate-rise mt-5 text-[clamp(2.75rem,6vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.035em]">
              Get Native VM
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-white/65 [animation-delay:100ms]">
              One app for every server you run. Install it, sign in with your Native VM account, and
              connect your first server. Nothing is installed on the server to run a panel.
            </p>
            <ul className="animate-rise mt-8 grid gap-3 text-[15px] text-white/70 [animation-delay:180ms] sm:grid-cols-2">
              {[
                "Free plan with a Native VM account",
                "Checks for updates when you ask",
                "Your keys stay on your computer",
                "No agent or daemon on your servers",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Check className="size-4 text-accent-400" aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise [animation-delay:240ms]">
            <RecommendedDownload />
          </div>
        </Container>
      </section>

      <section id="platforms" className="scroll-mt-20 bg-bg py-20 sm:py-24">
        <Container>
          <Kicker>Every platform</Kicker>
          <h2 className="font-wide mt-3 text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl">
            Version {version}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {platforms.map((item) => (
              <article
                key={item.id}
                className={cn(
                  "reveal flex flex-col border bg-white p-6 transition-shadow",
                  item.available
                    ? "border-accent/50 shadow-[0_30px_70px_-45px_rgba(13,148,136,0.7)]"
                    : "border-ink/12",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <OsBadge os={item.os} />
                  {item.available ? (
                    <Pill tone="accent">Available</Pill>
                  ) : (
                    <Pill tone="neutral">Coming soon</Pill>
                  )}
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.01em]">{item.os}</h3>
                <p className="kicker mt-1">{item.chip}</p>
                <p className="mt-3 text-sm leading-snug text-neutral-600">{item.requirement}</p>
                <ul className="mt-6 flex flex-1 flex-col justify-end gap-2.5">
                  {item.artifacts.map((artifact) => (
                    <li key={artifact.file}>
                      {item.available ? (
                        <a
                          href={downloadUrl(artifact.file)}
                          download=""
                          className="group flex items-center justify-between gap-3 bg-accent px-4 py-3 text-white transition-colors hover:bg-accent-700"
                        >
                          <span>
                            <span className="block font-semibold">{artifact.label}</span>
                            <span className="block text-xs text-white/75">
                              .{artifact.file.split(".").slice(-1)[0]}
                              {artifact.size ? ` · ${artifact.size}` : ""}
                            </span>
                          </span>
                          <Download className="size-[18px] transition-transform group-hover:translate-y-0.5" aria-hidden />
                        </a>
                      ) : (
                        <span
                          aria-disabled
                          className="flex items-center justify-between gap-3 border border-dashed border-ink/20 px-4 py-3 text-neutral-500"
                        >
                          <span>
                            <span className="block font-semibold">{artifact.label}</span>
                            <span className="block text-xs">Not built yet</span>
                          </span>
                          <Download className="size-[18px]" aria-hidden />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <Kicker>Install</Kicker>
          <h2 className="font-wide mt-3 text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl">
            Up and running in a minute
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {installSteps.map((group) => (
              <div key={group.os} className="reveal border-t-2 border-ink pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{group.os}</h3>
                  {group.available ? null : <Pill tone="neutral">Coming soon</Pill>}
                </div>
                <ol className="mt-5 space-y-4">
                  {group.steps.map((step, index) => (
                    <li key={index} className="flex gap-4 text-[15px] leading-relaxed text-neutral-700 [&_code]:bg-surface [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.86em] [&_code]:break-all [&_strong]:text-ink">
                      <span className="font-wide inline-flex size-7 shrink-0 items-center justify-center bg-ink text-sm font-extrabold text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg py-20 sm:py-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="reveal border border-ink/12 bg-white p-7 sm:p-9">
            <Monitor className="size-6 text-accent" aria-hidden />
            <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.02em]">Your computer</h2>
            <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {platforms.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-[15px]">
                  <span className="font-semibold">
                    {item.os} <span className="font-normal text-neutral-600">· {item.chip}</span>
                  </span>
                  <span className="text-right text-neutral-600">{item.requirement}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-neutral-600">
              An internet connection when the app starts: it checks your plan with your Native VM
              account. On macOS, the app is about 160 MB to download and 420 MB installed.
            </p>
          </div>
          <div className="reveal border border-ink/12 bg-white p-7 sm:p-9">
            <Server className="size-6 text-accent" aria-hidden />
            <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.02em]">Your servers</h2>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-neutral-700">
              <li className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                <span>
                  <strong className="text-ink">{supportedServers.join(", ")}</strong>, from any
                  provider. Other systems are refused with a message saying why.
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                <span>
                  SSH access as <strong className="text-ink">root with a key</strong>, or as a user
                  with a <strong className="text-ink">password-less sudo</strong> rule.
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                <span>The system&apos;s own Python 3, which these distributions already ship.</span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                <span>
                  Internet access from the server, for packages, runtimes and certificates. For
                  HTTPS, a domain pointed at it and port 80 open.
                </span>
              </li>
            </ul>
            <Link
              href="/docs/servers"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-accent-700 hover:text-ink"
            >
              Preparing a server <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <Kicker>Updates</Kicker>
            <h2 className="font-wide mt-3 text-3xl font-extrabold tracking-[-0.025em]">
              Staying up to date
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-700">
              <p>
                Click the Native VM logo at the top left of any window to open{" "}
                <strong className="text-ink">About Native VM</strong>, then{" "}
                <strong className="text-ink">Check for updates</strong>. The app looks only when you
                ask, and the check carries nothing about your servers.
              </p>
              <p>
                Your servers, host keys and settings live in the app&apos;s data folder and survive
                updates and uninstalls. On macOS, after an update, the system may ask once for your
                keychain password before the new build reads your saved credentials.
              </p>
              <p>
                Questions about a release? Write to{" "}
                <a href={`mailto:${site.contact.email}`} className="font-semibold text-accent-700 underline underline-offset-4">
                  {site.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
          <div className="reveal border-t-2 border-ink pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-wide text-2xl font-extrabold tracking-[-0.02em]">
                What&apos;s in {version}
              </h3>
              <Pill tone="accent">First release</Pill>
            </div>
            <ul className="mt-6 space-y-3.5">
              {releaseNotes.map((note) => (
                <li key={note} className="flex gap-3 text-[15px] leading-relaxed text-neutral-700">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}
