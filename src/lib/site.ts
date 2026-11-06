/**
 * Who makes Native VM and how to reach them. Mirrors `APP` in the desktop app's
 * core/about.py, which is what the About dialog shows.
 */
export const site = {
  name: "Native VM",
  url: "https://nativevm.com",
  tagline: "Your own servers, run from your desk.",
  description:
    "Native VM is a desktop app for macOS, Windows and Linux that sets up your Ubuntu or Debian server, deploys your apps from Git with one click, and keeps them running. Your credentials never leave your computer. Now in beta.",
  creator: "Md. Tauhid",
  since: 2026,
  contact: {
    email: "toolxbd.info@gmail.com",
    phone: "(+88) 01567944202",
    phoneHref: "tel:+8801567944202",
    address: "Gulshan 1, Dhaka, Bangladesh",
  },
  /** Native VM accounts live on toolxbd.com; the app opens these same pages. */
  account: {
    register: "https://www.toolxbd.com/register",
    upgrade: "https://www.toolxbd.com/",
  },
} as const;

export const mainNav = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Security", href: "/#security" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
] as const;
