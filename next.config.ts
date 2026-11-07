import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // A static export: `npm run build` writes the whole site to out/ as plain files, for any
  // web server or Native VM's own file server. See "Deploying" in the README.
  // Cache Components stays off: every page is built ahead of time anyway, and with it on
  // an export can't write robots.txt, sitemap.xml or the share image.
  output: "export",
  // Docs pages are written as MDX: app/docs/**/page.mdx.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // An export has no image server. The build writes each screenshot as WebP at a few
    // widths (scripts/export-images.mjs), and this loader points every <Image> at them.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Screenshots are mostly text; 90 keeps it crisp. 75 is Next's default.
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    // Plugins are named as strings so Turbopack can load them.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
