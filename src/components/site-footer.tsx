import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Wordmark } from "@/components/logo";
import { DarkBandTexture, Kicker, Mark } from "@/components/ui";
import { getRelease } from "@/lib/get-release";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Why Native VM", href: "/#why" },
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "One-click deploys", href: "/#deploy" },
      { label: "Security and privacy", href: "/#security" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Quick start", href: "/docs/quick-start" },
      { label: "Connecting a server", href: "/docs/servers" },
      { label: "Deploys and rollback", href: "/docs/deploys" },
      { label: "Security model", href: "/docs/security" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
];

export async function SiteFooter() {
  const { version, channel } = await getRelease();
  return (
    <footer className="relative isolate overflow-hidden bg-[#161514] text-white">
      <DarkBandTexture />
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pt-16 pb-10 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-5 text-[15px] leading-relaxed text-white/55">
            <span className="font-semibold text-white/85">
              Your VPS, your resources, your freedom.
            </span>{" "}
            Set up, deploy and run apps on your own Linux servers from a desktop app, with your
            credentials kept on your computer.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 border border-white/10 px-3 py-1.5 text-[13px] text-white/60">
            <Mark tone="led" /> {channel} · v{version} · macOS, Windows, Linux
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <Kicker dark>{column.title}</Kicker>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <Kicker dark>Contact</Kicker>
          <ul className="mt-4 space-y-3 text-[15px] text-white/70">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2.5 hover:text-white"
              >
                <Mail className="size-4 text-accent-400" aria-hidden /> {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center gap-2.5 hover:text-white"
              >
                <Phone className="size-4 text-accent-400" aria-hidden /> {site.contact.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <MapPin className="size-4 text-accent-400" aria-hidden /> {site.contact.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {site.since} {site.creator}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            For Ubuntu 22.04, Ubuntu 24.04 and Debian 12 servers.
            <a
              href="#content"
              className="inline-flex items-center gap-1.5 text-white/55 hover:text-white"
            >
              Back to top <ArrowUp className="size-3.5" aria-hidden />
            </a>
          </p>
        </div>
      </div>
      {/* The name, set large and faint, cut by the page's end. */}
      <p
        aria-hidden
        className="font-wide pointer-events-none -mb-[0.2em] text-center text-[min(17vw,15.5rem)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap text-white/[0.035] select-none"
      >
        Native VM
      </p>
    </footer>
  );
}
