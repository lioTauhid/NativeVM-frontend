import { Download } from "lucide-react";
import Link from "next/link";

import { Wordmark } from "@/components/logo";
import { MobileMenu } from "@/components/mobile-menu";
import { ButtonLink } from "@/components/ui";
import { mainNav } from "@/lib/site";

/** The app bar: ink, like the desktop app's, and translucent over the page. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/[0.93]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-8 px-5 sm:px-8">
        <Link href="/" aria-label="Native VM home" className="shrink-0">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-[14.5px] font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ButtonLink href="/download" size="sm">
            <Download aria-hidden /> Download
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
