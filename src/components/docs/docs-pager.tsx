"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsPages } from "@/lib/docs-nav";

/** Previous and next pages, in the sidebar's order. */
export function DocsPager() {
  const pathname = usePathname();
  const index = docsPages.findIndex((page) => page.href === pathname);
  if (index === -1) return null;
  const previous = index > 0 ? docsPages[index - 1] : null;
  const next = index < docsPages.length - 1 ? docsPages[index + 1] : null;

  return (
    <nav aria-label="Previous and next pages" className="mt-16 grid max-w-[46rem] gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={previous.href}
          className="group border border-ink/15 bg-white p-5 transition-[border-color,box-shadow] hover:border-accent hover:shadow-[0_24px_50px_-32px_rgba(13,148,136,0.6)]"
        >
          <span className="kicker flex items-center gap-1.5">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden /> Previous
          </span>
          <span className="mt-1.5 block font-bold">{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group border border-ink/15 bg-white p-5 text-right transition-[border-color,box-shadow] hover:border-accent hover:shadow-[0_24px_50px_-32px_rgba(13,148,136,0.6)]"
        >
          <span className="kicker flex items-center justify-end gap-1.5">
            Next <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
          <span className="mt-1.5 block font-bold">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
