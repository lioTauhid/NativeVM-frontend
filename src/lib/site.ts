/**
 * Who makes Native VM and how to reach them. Mirrors `APP` in the desktop app's
 * core/about.py, which is what the About dialog shows.
 */
export const site = {
  name: "Native VM",
  url: "https://nativevm.com",
  tagline: "Your own servers, run from your desk.",
  description:
    "Native VM is a desktop app that provisions, deploys and operates your apps on a bare Ubuntu or Debian VPS, over SSH only. Nothing is installed on the server to run a panel, and nothing listens on a port.",
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
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/docs" },
] as const;
