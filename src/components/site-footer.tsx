import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Wordmark } from "@/components/logo";
import { Mark } from "@/components/ui";
import { version } from "@/lib/release";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Security", href: "/#security" },
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

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#161514] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pt-16 pb-10 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-5 text-[15px] leading-relaxed text-white/55">
            Provision, deploy and operate apps on your own Linux servers, over SSH only. Nothing
            is installed on the server to run a panel.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 border border-white/10 px-3 py-1.5 text-[13px] text-white/60">
            <Mark tone="led" /> Version {version} · macOS available now
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="kicker text-white/40">{column.title}</p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="kicker text-white/40">Contact</p>
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
          <p>For Ubuntu 22.04, Ubuntu 24.04 and Debian 12 servers.</p>
        </div>
      </div>
    </footer>
  );
}
