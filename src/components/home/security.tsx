import {
  Archive,
  Braces,
  FileDiff,
  FingerprintPattern,
  KeyRound,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Container, SectionIntro } from "@/components/ui";

const controls: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FingerprintPattern,
    title: "Host keys are pinned",
    body: "You confirm a server's fingerprint once. If its key ever changes, Native VM refuses to connect, and there is no “continue anyway”.",
  },
  {
    icon: KeyRound,
    title: "Secrets stay in your keychain",
    body: "Passwords, passphrases and Git tokens live in your OS keychain, or sealed with AES-256-GCM if you prefer. Never in plaintext, never logged.",
  },
  {
    icon: ShieldCheck,
    title: "No sudo password, ever",
    body: "Root comes from a key or a password-less sudo rule. Native VM never asks for, holds or types a sudo password, and never puts a secret in a command line.",
  },
  {
    icon: Braces,
    title: "Values, not shell strings",
    body: "Privileged work goes to one reviewed helper file as JSON. A file called $(reboot).conf stays a file called $(reboot).conf.",
  },
  {
    icon: FileDiff,
    title: "A diff before every change",
    body: "nginx configs, unit files, environments and cron jobs are shown as a diff and checked against the server's copy before anything is written.",
  },
  {
    icon: Archive,
    title: "A snapshot before every overwrite",
    body: "The original goes to /var/backups/nativevm first, and the write is atomic. An nginx change that fails its test is rolled back on the spot.",
  },
];

const footprint = [
  {
    path: "/usr/local/lib/nativevm/agent-<sha256>.py",
    note: "One helper file, root-only, named for its own hash. It runs for one action and exits.",
  },
  {
    path: "/srv/<app>/",
    note: "Each app: its releases, its shared .env and the current link. The app runs as its own account.",
  },
  {
    path: "/opt/nativevm/runtimes/",
    note: "Node.js, Python, .NET and Java: the versions your apps asked for, side by side.",
  },
  { path: "/var/backups/nativevm/<time>/", note: "A copy of every file before Native VM changed it." },
];

export function Security() {
  return (
    <section id="security" className="relative isolate scroll-mt-20 overflow-hidden bg-[#161514] py-24 text-white sm:py-32">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-50" />
      <Container>
        <SectionIntro
          dark
          kicker="Security"
          title={
            <>
              It holds root on your servers.{" "}
              <span className="text-gradient">It&apos;s built like it.</span>
            </>
          }
        >
          <p>
            Native VM is agentless: the app on your computer is the control plane, and the server
            only ever sees SSH. These aren&apos;t settings. They&apos;re how it works.
          </p>
        </SectionIntro>

        <ul className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {controls.map(({ icon: Icon, title, body }) => (
            <li key={title} className="reveal group bg-[#161514] p-7 transition-colors hover:bg-[#1d1c1b]">
              <span className="inline-flex size-10 items-center justify-center border border-accent-400/40 text-accent-400 transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-[-0.01em]">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">{body}</p>
            </li>
          ))}
        </ul>

        <div className="reveal mt-14 border border-white/10 bg-black/25">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
            <p className="font-semibold">What Native VM leaves on your server</p>
            <p className="text-sm text-white/50">No daemon · No open port · No database</p>
          </div>
          <dl className="divide-y divide-white/10">
            {footprint.map((item) => (
              <div key={item.path} className="grid gap-1 px-6 py-4 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-8">
                <dt className="font-mono text-[13px] break-all text-accent-200">{item.path}</dt>
                <dd className="text-[15px] text-white/65">{item.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
