import {
  Archive,
  ArrowRight,
  CloudOff,
  FingerprintPattern,
  KeyRound,
  Laptop,
  LockKeyhole,
  Server,
  ServerOff,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Container, DarkBandTexture, SectionIntro } from "@/components/ui";

const promises: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: "No credentials collected",
    body: "We never see your SSH keys, server passwords or Git tokens. There's no Native VM server in the middle to collect them.",
  },
  {
    icon: Laptop,
    title: "Processed on your computer",
    body: "The app does its work on your machine and talks straight to your servers. No cloud service of ours sees your servers, code or data.",
  },
  {
    icon: KeyRound,
    title: "Kept in your keychain",
    body: "Passwords and tokens are stored in your system's own keychain, or encrypted with AES-256 if you prefer. Never in plain text, never in a log.",
  },
  {
    icon: FingerprintPattern,
    title: "Connections you can trust",
    body: "Native VM remembers each server's identity and refuses to connect if it ever changes, so nobody can pose as your server.",
  },
  {
    icon: ServerOff,
    title: "Nothing left running on your server",
    body: "No control panel, background agent or extra open port for an attacker to find. Between your actions, Native VM isn't there at all.",
  },
  {
    icon: Archive,
    title: "Every change approved and backed up",
    body: "You review each change before it's made, and the original file is saved first, so anything can be put back.",
  },
];

const onYourComputer = [
  "SSH keys, passwords and tokens, in your keychain",
  "Your servers, apps and settings, in a local folder",
  "Every action prepared and checked here",
];

const onYourServers = [
  "Your apps, running on their own",
  "No agent, panel or extra open port",
  "A backup of every file Native VM changes",
];

function Side({
  icon: Icon,
  kicker,
  title,
  items,
  local = false,
}: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  items: string[];
  local?: boolean;
}) {
  return (
    <div
      className={
        local
          ? "border border-accent-400/45 bg-accent/[0.09] p-6 sm:p-7"
          : "border border-white/15 bg-white/[0.03] p-6 sm:p-7"
      }
    >
      <p className={`kicker flex items-center gap-2 ${local ? "text-accent-400" : "text-white/55"}`}>
        <Icon className="size-4" aria-hidden /> {kicker}
      </p>
      <p className="mt-3 text-xl font-bold tracking-[-0.01em]">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[15px] leading-snug text-white/70">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span
              aria-hidden
              className={`mt-[7px] size-1.5 shrink-0 ${local ? "bg-accent-400" : "bg-white/45"}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Security() {
  return (
    <section
      id="security"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#161514] py-24 text-white sm:py-32"
    >
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-50" />
      <div
        aria-hidden
        className="glow-teal absolute top-[18%] -left-48 -z-10 h-[460px] w-[640px] opacity-35"
      />
      <DarkBandTexture />
      <Container>
        <SectionIntro
          dark
          kicker="Security and privacy"
          className="max-w-4xl"
          title={
            <>
              Your credentials{" "}
              <span className="text-gradient">never leave your computer.</span>
            </>
          }
        >
          <p className="max-w-3xl">
            Native VM is a desktop app, not a cloud service. It does its work on your computer and
            connects straight to your servers, so there&apos;s nobody in between to collect your
            keys, passwords or tokens.
          </p>
        </SectionIntro>

        <div className="reveal mt-14 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)_minmax(0,1fr)]">
          <Side
            local
            icon={Laptop}
            kicker="Your computer"
            title="Native VM, the app"
            items={onYourComputer}
          />
          <div className="relative flex items-center justify-center py-7 lg:px-4 lg:py-0">
            <span
              aria-hidden
              className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-accent-400/80 to-white/25 lg:inset-x-0 lg:inset-y-auto lg:top-1/2 lg:h-px lg:w-auto lg:translate-x-0 lg:-translate-y-1/2 lg:bg-gradient-to-r"
            />
            <p className="relative border border-white/15 bg-[#161514] px-4 py-2.5 text-center">
              <span className="flex items-center justify-center gap-1.5 text-sm font-semibold">
                <LockKeyhole className="size-3.5 text-accent-400" aria-hidden /> Direct SSH
              </span>
              <span className="block text-xs text-white/50">Encrypted, no middleman</span>
            </p>
          </div>
          <Side icon={Server} kicker="Your servers" title="Ubuntu or Debian" items={onYourServers} />
        </div>

        <p className="reveal mt-4 flex items-start gap-3 border border-dashed border-white/15 px-5 py-4 text-[15px] leading-relaxed text-white/60">
          <CloudOff className="mt-0.5 size-5 shrink-0 text-white/45" aria-hidden />
          <span>
            <strong className="font-semibold text-white">No Native VM cloud in between.</strong>{" "}
            Besides your servers, the app goes online for two things only: checking your plan, and
            seeing whether a newer version is out. Neither carries anything about your servers.
          </span>
        </p>

        <ul className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map(({ icon: Icon, title, body }) => (
            <li key={title} className="reveal group bg-[#161514] p-7 transition-colors hover:bg-[#1d1c1b]">
              <span className="inline-flex size-10 items-center justify-center border border-accent-400/40 text-accent-400 transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-[-0.01em]">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">{body}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/docs/security"
          className="reveal mt-10 inline-flex items-center gap-2 font-semibold text-accent-400 hover:text-white"
        >
          Read the security model <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Container>
    </section>
  );
}
