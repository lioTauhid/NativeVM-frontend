import { Plus } from "lucide-react";
import Link from "next/link";

import { Container, SectionIntro } from "@/components/ui";
import { site } from "@/lib/site";

const questions: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is anything installed on my server?",
    a: (
      <>
        One helper file, <code>/usr/local/lib/nativevm/agent-&lt;sha256&gt;.py</code>, readable only
        by root. It runs for the length of one action and exits: no daemon, no timer, no open port.
        What your apps need (their runtime, git, nginx, certbot) is installed when an action needs
        it, and nothing already installed is upgraded or reconfigured.
      </>
    ),
  },
  {
    q: "Does the app have to stay open?",
    a: (
      <>
        No. Your apps run under systemd and restart themselves, and certificates renew from a timer
        on the server. What stops when you close Native VM is watching: metrics history begins when
        you connect, and nothing is collected while it&apos;s closed.
      </>
    ),
  },
  {
    q: "Which servers can it manage?",
    a: (
      <>
        Ubuntu 22.04 LTS, Ubuntu 24.04 LTS and Debian 12, from any provider. You need SSH access as
        root with a key, or as a user with a password-less sudo rule. Anything else is refused with a
        message saying what was found and what&apos;s supported.
      </>
    ),
  },
  {
    q: "Where are my passwords and keys kept?",
    a: (
      <>
        In your operating system&apos;s keychain by default: macOS Keychain, Windows Credential
        Manager, or Secret Service and KWallet on Linux. You can choose Native VM&apos;s own encrypted store
        instead. A private key file is never copied; Native VM keeps its path, as OpenSSH does.
      </>
    ),
  },
  {
    q: "Do I need an account?",
    a: (
      <>
        Yes. Native VM is used signed in, with a free account from{" "}
        <a href={site.account.register} target="_blank" rel="noopener noreferrer">
          toolxbd.com
        </a>
        . The app checks your plan as it starts, so it needs an internet connection at launch. Your
        servers, keys and apps never go to the account service.
      </>
    ),
  },
  {
    q: "What doesn't it do?",
    a: (
      <>
        Some things are deliberately out of scope: email hosting, PHP, domain registration, web logins
        for your customers, and monitoring while the app is closed. Red Hat, Rocky and Alma servers
        come later.
      </>
    ),
  },
];

export function Faq() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <div>
          <SectionIntro kicker="Questions" title="Good to know before you start.">
            <p>
              The <Link href="/docs" className="font-semibold text-accent-700 underline underline-offset-4 hover:text-ink">documentation</Link>{" "}
              covers every screen. Still stuck? Write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-accent-700 underline underline-offset-4 hover:text-ink"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </SectionIntro>
        </div>
        <div className="border-t-2 border-ink">
          {questions.map((item) => (
            <details key={item.q} className="reveal group border-b border-ink/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <div className="pb-6 text-[15.5px] leading-relaxed text-neutral-700 [&_a]:font-semibold [&_a]:text-accent-700 [&_a]:underline [&_code]:bg-surface [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.88em]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
