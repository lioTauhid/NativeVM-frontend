import { ClosingCta } from "@/components/home/closing-cta";
import { Deploys } from "@/components/home/deploys";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Frameworks } from "@/components/home/frameworks";
import { Hero } from "@/components/home/hero";
import { Pricing } from "@/components/home/pricing";
import { Security } from "@/components/home/security";
import { Stats } from "@/components/home/stats";
import { Workflow } from "@/components/home/workflow";
import { Container, SectionIntro } from "@/components/ui";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />

      <section id="how-it-works" className="scroll-mt-20 bg-bg pt-24 pb-8 sm:pt-32">
        <Container>
          <SectionIntro kicker="How it works" title="From a bare VPS to a live app, in five steps.">
            <p>
              No panel to install and nothing to keep running on the server. Native VM connects,
              checks, and does each step over SSH, showing you what it&apos;s about to change.
            </p>
          </SectionIntro>
          <div className="mt-14">
            <Workflow />
          </div>
        </Container>
      </section>

      <Features />
      <Deploys />
      <Frameworks />
      <Security />
      <Pricing />
      <Faq />
      <ClosingCta />
    </main>
  );
}
