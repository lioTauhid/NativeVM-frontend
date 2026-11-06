import { ClosingCta } from "@/components/home/closing-cta";
import { Deploys } from "@/components/home/deploys";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Pricing } from "@/components/home/pricing";
import { Security } from "@/components/home/security";
import { Stats } from "@/components/home/stats";
import { Workflow } from "@/components/home/workflow";
import { Container, SectionIntro } from "@/components/ui";

/**
 * The product page. It sells: what Native VM does for you, one-click deploys, privacy,
 * plans. How each part works belongs in the docs, and every section links there.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />

      <section
        id="how-it-works"
        className="relative isolate scroll-mt-20 overflow-clip bg-bg py-24 sm:py-32"
      >
        {/* overflow-clip, not hidden: the screenshot column stays sticky. */}
        <div aria-hidden className="bg-grid-ink absolute top-0 right-0 -z-10 h-[620px] w-[70%]" />
        <Container>
          <SectionIntro kicker="How it works" title="From a bare VPS to a live app, in five steps.">
            <p>
              No server panel to install and no config files to write. Native VM walks you through
              each step, and shows you what it&apos;s about to change before it does.
            </p>
          </SectionIntro>
          <div className="mt-14">
            <Workflow />
          </div>
        </Container>
      </section>

      <Deploys />
      <Features />
      <Security />
      <Pricing />
      <Faq />
      <ClosingCta />
    </main>
  );
}
