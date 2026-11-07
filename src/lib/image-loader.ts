"use client";

import widths from "./image-widths.json";

/**
 * Where an <Image> loads from, in the static export.
 *
 * There's no image server in an export, so the build writes every imported image as WebP
 * at each width in image-widths.json, beside the original and named after it:
 * overview.<hash>.png becomes overview.<hash>.w1280.webp (scripts/export-images.mjs).
 * This picks the smallest of those at least as wide as the browser asked for. The hash
 * stays in the name, so the files can be cached forever.
 *
 * `next dev` serves the originals, since nothing has written the WebP files yet.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (process.env.NODE_ENV === "development") return src;
  const match = /^(\/_next\/static\/media\/.+)\.(png|jpe?g)$/i.exec(src);
  if (!match) return src;
  const size = widths.find((candidate) => candidate >= width) ?? widths[widths.length - 1];
  return `${match[1]}.w${size}.webp`;
}
