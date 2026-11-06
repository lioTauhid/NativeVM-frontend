import type { Metadata } from "next";

import { DocsPager } from "@/components/docs/docs-pager";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";

export const metadata: Metadata = {
  title: {
    template: "%s · Native VM docs",
    default: "Native VM docs",
  },
};

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="bg-bg">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col px-5 sm:px-8 lg:flex-row lg:gap-12 xl:gap-14">
        <DocsSidebar />
        <main className="min-w-0 flex-1 pt-10 pb-24 lg:pt-14">
          <article data-docs-article className="prose-nvm">
            {children}
          </article>
          <DocsPager />
        </main>
        <DocsToc />
      </div>
    </div>
  );
}
