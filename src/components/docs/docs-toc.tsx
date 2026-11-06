"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type Heading = { id: string; text: string; level: 2 | 3 };

/** "On this page": the article's h2 and h3, with the one being read marked. */
export function DocsToc() {
  const pathname = usePathname();
  // A new page gets a fresh list.
  return <TocList key={pathname} />;
}

function TocList() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const frame = requestAnimationFrame(() => {
      // Pages navigated away from stay mounted but hidden, so only visible headings count.
      const found = Array.from(
        document.querySelectorAll<HTMLElement>("[data-docs-article] h2[id], [data-docs-article] h3[id]"),
      ).filter((element) => element.getClientRects().length > 0);

      setHeadings(
        found.map((element) => ({
          id: element.id,
          text: element.textContent?.trim() ?? "",
          level: element.tagName === "H3" ? 3 : 2,
        })),
      );

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((entry) => entry.isIntersecting);
          if (visible.length > 0) setActive(visible[0].target.id);
        },
        { rootMargin: "-80px 0px -65% 0px" },
      );
      found.forEach((element) => observer?.observe(element));
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto pt-14 pb-10">
        {headings.length > 0 ? (
          <>
            <p className="kicker mb-3">On this page</p>
            <ul className="border-l border-ink/12">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "-ml-px block border-l-2 py-1 text-[13.5px] leading-snug transition-colors",
                      heading.level === 3 ? "pl-6" : "pl-3.5",
                      active === heading.id
                        ? "border-accent font-semibold text-ink"
                        : "border-transparent text-neutral-600 hover:text-ink",
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </aside>
  );
}
