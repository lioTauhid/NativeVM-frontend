/** The docs sidebar, in reading order. Each href is a page.mdx under app/docs. */
export type DocLink = { title: string; href: string };
export type DocSection = { title: string; items: DocLink[] };

export const docsNav: DocSection[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick start", href: "/docs/quick-start" },
      { title: "Account and plans", href: "/docs/account-and-plans" },
      { title: "Finding your way around", href: "/docs/interface" },
    ],
  },
  {
    title: "Servers",
    items: [
      { title: "Connecting a server", href: "/docs/servers" },
      { title: "Credentials", href: "/docs/credentials" },
    ],
  },
  {
    title: "Apps",
    items: [
      { title: "Creating an app", href: "/docs/apps" },
      { title: "Frameworks and runtimes", href: "/docs/frameworks" },
      { title: "Deploys and rollback", href: "/docs/deploys" },
      { title: "Environment variables", href: "/docs/environment" },
      { title: "Editing and removing apps", href: "/docs/editing-apps" },
    ],
  },
  {
    title: "Domains and HTTPS",
    items: [
      { title: "Domains and preview ports", href: "/docs/domains" },
      { title: "SSL certificates", href: "/docs/ssl" },
    ],
  },
  {
    title: "Operating a server",
    items: [
      { title: "Overview and metrics", href: "/docs/overview" },
      { title: "Services and logs", href: "/docs/services" },
      { title: "Cron jobs", href: "/docs/cron" },
      { title: "Files", href: "/docs/files" },
      { title: "Terminal and Live Monitor", href: "/docs/terminal" },
      { title: "Uninstaller", href: "/docs/uninstaller" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Security model", href: "/docs/security" },
      { title: "What's on your server", href: "/docs/server-layout" },
      { title: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
];

export const docsPages: DocLink[] = docsNav.flatMap((section) => section.items);
