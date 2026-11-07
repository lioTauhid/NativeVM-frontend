// Serves the static export in out/ the way a static host does, to check a build before
// deploying it: `npm run start`, then http://localhost:3000 (PORT=4000 npm run start for
// another port). `next start` doesn't run static exports.
//
// Like nginx's `try_files $uri $uri.html $uri/index.html` and Native VM's file server:
// /download serves download.html, an unknown path gets 404.html with status 404, and
// _next/static is cached forever, its names carrying a content hash.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 3000);

const types = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolve(pathname) {
  const path = normalize(join(root, decodeURIComponent(pathname)));
  if (path !== root && !path.startsWith(root + sep)) return null;
  for (const candidate of [path, `${path}.html`, join(path, "index.html")]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

createServer(async (request, response) => {
  try {
    const { pathname } = new URL(request.url ?? "/", "http://localhost");
    const file = await resolve(pathname);
    const served = file ?? join(root, "404.html");
    response.writeHead(file ? 200 : 404, {
      "content-type": types[extname(served)] ?? "application/octet-stream",
      ...(pathname.startsWith("/_next/static/")
        ? { "cache-control": "public, max-age=31536000, immutable" }
        : {}),
    });
    response.end(request.method === "HEAD" ? undefined : await readFile(served));
  } catch {
    response.writeHead(500).end();
  }
}).listen(port, () => {
  console.log(`Serving out/ at http://localhost:${port}`);
});
