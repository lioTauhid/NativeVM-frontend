import type { MetadataRoute } from "next";

import { docsPages } from "@/lib/docs-nav";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/download", ...docsPages.map((page) => page.href)];
  return pages.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: path === "/" || path === "/download" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/download" ? 0.9 : 0.6,
  }));
}
