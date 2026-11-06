import { Download } from "lucide-react";
import Link from "next/link";

import { Wordmark } from "@/components/logo";
import { MobileMenu } from "@/components/mobile-menu";
import { ButtonLink, Pill } from "@/components/ui";
import { mainNav } from "@/lib/site";

/** The app bar: ink, like the desktop app's, and translucent over the page. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/[0.93]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-8 px-5 sm:px-8">
        <div className="flex shrink-0 items-center gap-2.5">
          <Link href="/" aria-label="Native VM home">
            <Wordmark />
          </Link>
          <Pill tone="beta">Beta</Pill>
        </div>
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-[14.5px] font-medium text-white/70 transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent-400 after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          {/* On a phone the menu carries Download: there's no room beside the beta label. */}
          <div className="hidden sm:block">
            <ButtonLink href="/download" size="sm">
              <Download aria-hidden /> Download
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
