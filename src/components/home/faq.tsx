import { Plus } from "lucide-react";
import Link from "next/link";

import { Container, SectionIntro } from "@/components/ui";
import { site } from "@/lib/site";

const questions: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is Native VM in beta?",
    a: (
      <>
        Yes. The whole app is in beta, on macOS, Windows and Linux. It&apos;s in active
        development, so expect regular updates and the occasional rough edge. When you find one,
        write to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </>
    ),
  },
  {
    q: "Does Native VM collect my credentials or data?",
    a: (
      <>
        No. Your SSH keys, server passwords and Git tokens stay on your computer, in your
        system&apos;s keychain. Native VM connects straight to your servers. It contacts us only to
        check your plan when you sign in, and for updates when you ask, and neither carries anything
        about your servers.
      </>
    ),
  },
  {
    q: "How does one-click deploy work?",
    a: (
      <>
        Create the app from its Git repository once. Whenever you push new commits, press{" "}
        <strong>Re-Deploy</strong>: Native VM fetches the newest commit, builds it, checks
        it&apos;s running and switches over. If the new version doesn&apos;t start, the previous one
        keeps serving, and any earlier release is one click away.
      </>
    ),
  },
  {
    q: "Do I need to install anything on my server?",
    a: (
      <>
        No. Bring a fresh server and an SSH login. Native VM sets up what each app needs as you go,
        and leaves no control panel or background service running.
      </>
    ),
  },
  {
    q: "Will Native VM slow my server down?",
    a: (
      <>
        No. Nothing of Native VM runs on your server between your actions, and it never sits
        between your visitors and your app. Your server&apos;s CPU and memory go to your apps.
      </>
    ),
  },
  {
    q: "Which servers can it manage?",
    a: (
      <>
        Ubuntu 22.04 LTS, Ubuntu 24.04 LTS and Debian 12, from any provider. You&apos;ll need SSH
        access as root, or as a user who can use sudo without a password.
      </>
    ),
  },
  {
    q: "Does the app have to stay open?",
    a: (
      <>
        No. Your apps keep running, and their certificates keep renewing, on the server, whether
        Native VM is open or not.
      </>
    ),
  },
  {
    q: "Do I need an account?",
    a: (
      <>
        Yes, a free one from{" "}
        <a href={site.account.register} target="_blank" rel="noopener noreferrer">
          toolxbd.com
        </a>
        . The app checks your plan when it starts, so it needs an internet connection then. Your
        servers, keys and apps are never sent to the account service.
      </>
    ),
  },
  {
    q: "Is there anything it doesn't do?",
    a: (
      <>
        A few things are out of scope by design: PHP, email hosting and domain registration. Red
        Hat, Rocky and Alma Linux servers come later.
      </>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-white py-24 sm:py-32">
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
            <details key={item.q} className="faq-item reveal group border-b border-ink/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold tracking-[-0.01em] transition-colors hover:text-accent-700 group-open:text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="inline-flex size-8 shrink-0 items-center justify-center border border-ink/15 text-accent transition-colors duration-300 group-open:border-accent group-open:bg-accent group-open:text-white"
                >
                  <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                </span>
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
