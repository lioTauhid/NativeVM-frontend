import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

import "./globals.css";

// The desktop app's typeface, self-hosted (SIL OFL 1.1, see fonts/OFL.txt) so a build
// never waits on a font server. It is variable in weight and width; the width axis
// gives the wide display headings.
const archivo = localFont({
  src: "./fonts/Archivo-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · One-click deploys to your own servers`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.creator }],
  keywords: [
    "VPS management",
    "server management",
    "one-click deploy",
    "CI/CD",
    "deploy from Git",
    "self-hosting",
    "desktop app",
    "Let's Encrypt",
    "Ubuntu",
    "Debian",
    "macOS",
    "Windows",
    "Linux",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#201e1d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#content"
          className="sr-only z-[60] bg-accent px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="content" className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
