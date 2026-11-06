"use client";

import { ChevronDown, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { docsNav, docsPages } from "@/lib/docs-nav";

export function DocsSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const current = docsPages.find((page) => page.href === pathname);

  const needle = query.trim().toLowerCase();
  const sections = docsNav
    .map((section) => ({
      ...section,
      items: needle
        ? section.items.filter(
            (item) =>
              item.title.toLowerCase().includes(needle) ||
              section.title.toLowerCase().includes(needle),
          )
        : section.items,
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 border-b border-ink/12 bg-bg/95 px-5 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="docs-nav"
          onClick={() => setOpen((value) => !value)}
          className="flex h-12 w-full items-center justify-between gap-3 text-left text-[15px] font-semibold"
        >
          <span className="truncate">
            <span className="text-neutral-500">Docs</span>
            {current ? <span> / {current.title}</span> : null}
          </span>
          {open ? <X className="size-4 shrink-0" aria-hidden /> : <ChevronDown className="size-4 shrink-0" aria-hidden />}
        </button>
      </div>

      <aside
        id="docs-nav"
        className={cn(
          "lg:sticky lg:top-16 lg:block lg:h-[calc(100dvh-4rem)] lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:overscroll-contain lg:border-r lg:border-ink/10 lg:pr-6",
          open ? "block border-b border-ink/12 pb-6" : "hidden",
        )}
      >
        <div className="pt-6 lg:pt-10">
          <label className="relative block">
            <span className="sr-only">Filter the docs</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter pages"
              className="h-10 w-full border border-ink/20 bg-white pr-3 pl-9 text-[14.5px] placeholder:text-neutral-500 focus:border-accent focus:outline-none"
            />
          </label>
        </div>
        <nav aria-label="Documentation" className="pt-6 pb-10">
          {sections.length === 0 ? (
            <p className="text-sm text-neutral-600">No page matches “{query}”.</p>
          ) : null}
          {sections.map((section) => (
            <div key={section.title} className="mb-7">
              <p className="kicker mb-2">{section.title}</p>
              <ul>
                {section.items.map((item) => {
                  const active = item.href === pathname;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative block py-1.5 pr-2 pl-3.5 text-[14.5px] transition-colors",
                          active
                            ? "bg-ink font-semibold text-white"
                            : "text-neutral-800 hover:bg-ink/[0.06] hover:text-ink",
                        )}
                      >
                        {active ? (
                          <span aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] bg-accent" />
                        ) : null}
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
