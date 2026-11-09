import { ArrowRight, ArrowUpRight, Check, Download, Monitor, Server } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { OsBadge } from "@/components/download/os-badge";
import { RecommendedDownload } from "@/components/download/recommended-download";
import { Container, DarkBandTexture, Kicker, Mark, Pill } from "@/components/ui";
import { cn } from "@/lib/cn";
import { getRelease } from "@/lib/get-release";
import { installFiles, supportedServers, type Release } from "@/lib/release";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download the Native VM beta for macOS, Windows and Linux: one-click deploys to your own servers, with your credentials kept on your computer.",
};

/** A file's extension as people say it: .dmg, .tar.gz. */
function extension(file: string): string {
  return /\.tar\.gz$/i.test(file) ? ".tar.gz" : `.${file.split(".").pop()}`;
}

/** "7 November 2026", or nothing if the time can't be read. */
function releaseDate(published: string | undefined): string | undefined {
  const date = published ? new Date(published) : undefined;
  if (!date || Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function installSteps(release: Release): { os: string; steps: React.ReactNode[] }[] {
  // Each step names the file as it downloads, and mentions the portable ones only if offered.
  const { dmg, installer, portableZip, deb, portableTarball } = installFiles(release);
  return [
    {
      os: "macOS",
      steps: [
        <>
          Open <code>{dmg}</code> and drag <strong>Native VM</strong> into{" "}
          <strong>Applications</strong>.
        </>,
        <>
          Open it from Applications. The beta isn&apos;t notarized by Apple yet, so macOS may say it
          can&apos;t check the app: open <strong>System Settings → Privacy &amp; Security</strong>{" "}
          and choose <strong>Open Anyway</strong>. You only do this once.
        </>,
        <>
          Sign in with your Native VM account, or choose <strong>Create an account</strong>.
        </>,
      ],
    },
    {
      os: "Windows",
      steps: [
        <>
          Run <code>{installer}</code>. It installs for your user with no administrator prompt;
          the installer also offers <strong>all users</strong>.
        </>,
        ...(portableZip
          ? [
              <>
                Or unzip the portable <code>.zip</code> anywhere and run <code>Native VM.exe</code>.
              </>,
            ]
          : []),
        <>
          Sign in with your Native VM account, or choose <strong>Create an account</strong>.
        </>,
      ],
    },
    {
      os: "Linux",
      steps: [
        <>
          Install the package: <code>sudo apt install ./{deb}</code>
        </>,
        <>
          Open <strong>Native VM</strong> from your applications menu, or run{" "}
          <code>nativevm</code>.
          {portableTarball ? (
            <>
              {" "}
              The portable <code>.tar.gz</code> runs without installing.
            </>
          ) : null}
        </>,
        <>
          Sign in with your Native VM account, or choose <strong>Create an account</strong>.
        </>,
      ],
    },
  ];
}

const highlights = [
  "Free plan with a Native VM account",
  "Your credentials stay on your computer",
  "One-click deploys from Git",
  "No agent or panel on your servers",
];

const releaseNotes = [
  "Native VM for macOS, Windows and Linux, in beta.",
  "Connect Ubuntu 22.04, 24.04 and Debian 12 servers with a key or a password, or import the ones you already use.",
  "A New app wizard for Django, FastAPI, Flask, Express, Next.js, Node.js, static sites, Go, ASP.NET Core, Spring Boot and OpenClaw, from Git or a folder on your computer.",
  "One-click Deploy of your branch's newest commit, exactly as the repository has it, checked before it goes live and put back automatically if it doesn't start.",
  "One-click rollback to any of the last five releases.",
  "Domains and free HTTPS certificates that renew on their own.",
  "Live metrics, services and logs, scheduled jobs, a file manager, terminals and Live Monitor.",
  "An Uninstaller that shows exactly what it will remove before it removes it.",
];

export default async function DownloadPage() {
  const release = await getRelease();
  const { version, channel, url, published, platforms } = release;
  const released = releaseDate(published);

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="glow-teal absolute top-1/2 right-[-10%] -z-10 h-[520px] w-[760px] -translate-y-1/2 opacity-70"
        />
        <div aria-hidden className="bg-spotlight absolute inset-x-0 top-0 -z-10 h-[520px]" />
        <DarkBandTexture edge={false} />
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p className="kicker flex items-center gap-2 text-accent-400">
              <Mark tone="busy" /> {channel} · Version {version}
            </p>
            <h1 className="font-wide animate-rise mt-5 text-[clamp(2.75rem,6vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.035em]">
              Get Native VM
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-white/65 [animation-delay:100ms]">
              One app for every server you run, now in beta on macOS, Windows and Linux. Install it,
              sign in with your Native VM account, and connect your first server.
            </p>
            <ul className="animate-rise mt-8 grid gap-3 text-[15px] text-white/70 [animation-delay:180ms] sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Check className="size-4 text-accent-400" aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise [animation-delay:240ms]">
            <RecommendedDownload platforms={platforms} version={version} channel={channel} />
          </div>
        </Container>
      </section>

      <section
        id="platforms"
        className="relative isolate scroll-mt-20 overflow-hidden bg-bg py-20 sm:py-24"
      >
        <div aria-hidden className="bg-grid-ink absolute top-0 right-0 -z-10 h-[520px] w-[65%]" />
        <Container>
          <Kicker>Every platform</Kicker>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 className="font-wide text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl">
              Version {version}
            </h2>
            <p className="text-[15px] text-neutral-600">
              {released ? <>Released {released} · </> : null}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-700 underline underline-offset-4 hover:text-ink"
              >
                Release notes on GitHub
                <ArrowUpRight className="ml-1 inline size-3.5 align-[-0.1em]" aria-hidden />
              </a>
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {platforms.map((item) => {
              const files = item.available
                ? item.artifacts.filter((artifact) => artifact.url)
                : item.artifacts;
              return (
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
                      <Pill tone="accent">{channel}</Pill>
                    ) : (
                      <Pill tone="neutral">Not yet</Pill>
                    )}
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-[-0.01em]">{item.os}</h3>
                  <p className="kicker mt-1">{item.chip}</p>
                  <p className="mt-3 text-sm leading-snug text-neutral-600">{item.requirement}</p>
                  <ul className="mt-6 flex flex-1 flex-col justify-end gap-2.5">
                    {files.map((artifact) => (
                      <li key={artifact.file}>
                        {item.available && artifact.url ? (
                          <a
                            href={artifact.url}
                            download=""
                            className="group flex items-center justify-between gap-3 bg-accent px-4 py-3 text-white transition-colors hover:bg-accent-700"
                          >
                            <span>
                              <span className="block font-semibold">{artifact.label}</span>
                              <span className="block text-xs text-white/75">
                                {extension(artifact.file)}
                                {artifact.size ? ` · ${artifact.size}` : ""}
                              </span>
                            </span>
                            <Download
                              className="size-[18px] transition-transform group-hover:translate-y-0.5"
                              aria-hidden
                            />
                          </a>
                        ) : (
                          <span
                            aria-disabled
                            className="flex items-center justify-between gap-3 border border-dashed border-ink/20 px-4 py-3 text-neutral-500"
                          >
                            <span>
                              <span className="block font-semibold">{artifact.label}</span>
                              <span className="block text-xs">Coming later</span>
                            </span>
                            <Download className="size-[18px]" aria-hidden />
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="reveal mt-8 flex flex-col gap-3 border border-accent/30 bg-accent-100/70 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
            <Pill tone="accent" className="self-start sm:self-auto">
              {channel}
            </Pill>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Every build of Native VM is a beta. It&apos;s in active development, so expect regular
              updates and the occasional rough edge. Found one? Write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-accent-700 underline underline-offset-4 hover:text-ink"
              >
                {site.contact.email}
              </a>
              .
            </p>
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
            {installSteps(release).map((group) => (
              <div key={group.os} className="reveal border-t-2 border-ink pt-6">
                <h3 className="text-xl font-bold">{group.os}</h3>
                <ol className="mt-5 space-y-4">
                  {group.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex gap-4 text-[15px] leading-relaxed text-neutral-700 [&_code]:bg-surface [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.86em] [&_code]:break-all [&_strong]:text-ink"
                    >
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
              account, and looks for a newer version. On macOS, the app is about 160 MB to download
              and 420 MB installed.
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
                Native VM looks for a newer version each time it starts, once you&apos;ve signed
                in. When one is out, it tells you over the Servers window:{" "}
                <strong className="text-ink">Download</strong> opens the release, and{" "}
                <strong className="text-ink">Not now</strong> waits until the next launch. To look
                yourself, click the Native VM logo at the top left of any window to open{" "}
                <strong className="text-ink">About Native VM</strong>. The check carries nothing
                about your servers.
              </p>
              <p>
                Install the new version over the one you have. Your servers, host keys and settings
                live in the app&apos;s data folder and survive updates and uninstalls. On macOS,
                after an update, the system may ask once for your keychain password before the new
                build reads your saved credentials.
              </p>
              <p>
                Questions about a release? Write to{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-semibold text-accent-700 underline underline-offset-4"
                >
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
              <Pill tone="accent">{channel}</Pill>
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
