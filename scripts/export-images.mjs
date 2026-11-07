// Writes the static export's images: every PNG or JPEG the build put in
// out/_next/static/media/, as WebP at each width in src/lib/image-widths.json, beside the
// original. src/lib/image-loader.ts points <Image> at these, since an export has no image
// server. Runs after `next build` as npm's postbuild step.
//
// Each file is named after its original, content hash included
// (overview.<hash>.png -> overview.<hash>.w1280.webp), so it can be cached forever, and
// a file that already exists is already right.

import { existsSync, readFileSync } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

const media = join(process.cwd(), "out", "_next", "static", "media");
const widths = JSON.parse(readFileSync(join(process.cwd(), "src", "lib", "image-widths.json"), "utf8"));

if (!existsSync(media)) {
  console.error("export-images: out/_next/static/media is missing. Run `npm run build`, not `next build` alone.");
  process.exit(1);
}

const originals = (await readdir(media)).filter((name) => /\.(png|jpe?g)$/i.test(name));
let written = 0;
let before = 0;
let after = 0;

for (const name of originals) {
  const source = join(media, name);
  const { width: sourceWidth } = await sharp(source).metadata();
  const base = name.replace(/\.(png|jpe?g)$/i, "");
  before += (await stat(source)).size;

  for (const width of widths) {
    const target = join(media, `${base}.w${width}.webp`);
    if (!existsSync(target)) {
      // Never enlarged: a width past the original's is written at the original's size.
      const size = Math.min(width, sourceWidth);
      const image = sharp(source).resize({ width: size, withoutEnlargement: true });
      // At full size, near-lossless keeps the text exact and comes out smaller; once
      // resized, ordinary WebP at 82 looks the same and is much lighter.
      await (size === sourceWidth
        ? image.webp({ nearLossless: true, quality: 60, effort: 5 })
        : image.webp({ quality: 82, effort: 5 })
      ).toFile(target);
      written += 1;
    }
    if (width === 1280) after += (await stat(target)).size;
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
console.log(
  `export-images: ${originals.length} images, ${written} WebP files written. ` +
    `At 1280px they weigh ${kb(after)}, against ${kb(before)} for the originals.`,
);
