# Native VM website

The website for [Native VM](https://nativevm.com), the desktop app that provisions,
deploys and operates apps on your own Linux servers over SSH only: the product page,
downloads, and the documentation.

Built with Next.js 16 (App Router, Turbopack), Tailwind CSS 4 and MDX, as a **static export**:
the whole site builds to plain files in `out/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000, while you work
npm run build      # the static site, in out/, with type checking
npm run start      # serve out/ at http://localhost:3000, to check a build
npm run lint
```

`npm run build` runs `next build`, then `scripts/export-images.mjs`, which writes the screenshots as
WebP at a few widths. Run the build through npm, not `next build` alone, or the images are missing.

## Deploying

Upload `out/` to any web server or static host. Every page is a file: `/download` is
`download.html` and `/docs/ssl` is `docs/ssl.html`, so the server needs to try the `.html` name, and
should send `404.html` for anything it can't find. With nginx:

```nginx
root /var/www/nativevm/out;

location / {
    try_files $uri $uri.html $uri/index.html =404;
}

location /_next/static/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}

error_page 404 /404.html;
```

Or deploy it with Native VM itself, as a **Next.js** app: it runs `npm run build`, sees the static
export, and serves `out/` with its own file server, which already does all of the above.

There's no server code at all, so anything that has to change at runtime can't: the download links
and the version are fixed when the site is built (see below).

## What's where

| Path | What belongs there |
|---|---|
| `src/app/page.tsx` | The home page, assembled from `src/components/home/`. |
| `src/app/download/` | The Download page. |
| `src/app/docs/**/page.mdx` | The documentation, one MDX file per page. |
| `src/lib/docs-nav.ts` | The docs sidebar, its order, and so the previous/next links. |
| `src/lib/release.ts` | **The releases repository, each platform, and the version shown if GitHub can't be reached.** |
| `src/lib/get-release.ts` | **Where every download link comes from**: the latest GitHub release. |
| `src/lib/site.ts` | Name, contact details, account links, the main navigation. |
| `src/lib/plans.ts` | What the Free and Pro plans allow. |
| `src/lib/frameworks.ts` | The framework tiles and runtime versions. |
| `src/lib/screens.ts` | The app screenshots and their alt text. |
| `src/assets/screenshots/` | Screenshots of the real app (see below). |
| `src/mdx-components.tsx` | How MDX renders, and the components docs can use. |
| `src/app/globals.css` | Design tokens, taken from the app's `ui/theme/tokens.py`, and docs typography. |
| `src/app/og.png/route.tsx` | The card shown when a link is shared, drawn at build time. |
| `src/lib/image-loader.ts` | Where each `<Image>` loads from in the export: the WebP files the build writes. |
| `scripts/export-images.mjs` | Writes those WebP files, after `next build`. |
| `scripts/serve-out.mjs` | `npm run start`: serves `out/` like a static host. |

The look follows the desktop app's own design system: Archivo, one ink colour, the logo's teal for
actions, red only for what needs attention, square corners and status marks.

## Publishing a release

The Download page, the version on every page and the file names in the docs all come from the
**latest release** of [lioTauhid/NativeVM-frontend](https://github.com/lioTauhid/NativeVM-frontend/releases),
which `getRelease()` in `src/lib/get-release.ts` reads from GitHub's API while the site builds.
A new version needs no change to the code:

1. On GitHub, draft a new release with the tag `v<version>`, for example `v0.8.0`. The tag is the
   version the site shows; the release's title isn't used.
2. Attach the files the app's `make package` writes, under the names it gives them (below).
3. Publish it, with **Set as the latest release** ticked.
4. **Rebuild and redeploy the site**: with Native VM, that's Re-Deploy. The links are written into
   the pages when they're built, and the build log names the release it found:
   `Downloads: Native VM 0.8.0 from https://github.com/…/releases/tag/v0.8.0 (macos-arm64, …)`.

Each file goes to a platform by its name:

| File | Platform | Shown as |
|---|---|---|
| `NativeVM-<version>-macos-arm64.dmg` | macOS, Apple silicon | Disk image |
| `NativeVM-<version>-macos-x64.dmg` | macOS, Intel | Disk image |
| `NativeVM-<version>-windows-x64-setup.exe` | Windows | Installer |
| `NativeVM-<version>-windows-x64.zip` | Windows | Portable .zip |
| `nativevm_<version>_amd64.deb` | Linux | Debian package |
| `NativeVM-<version>-linux-x64.tar.gz` | Linux | Portable .tar.gz |

- The system comes from the kind of file (`.dmg`, `.exe`, `.deb`) or the name (`macos`, `windows`,
  `linux`), and the processor from `arm64` or `x64`/`amd64`. A universal `.dmg` serves both kinds of
  Mac, and `.msi`, `.pkg`, `.rpm` and `.AppImage` files are offered too.
- A platform with no file shows as **Not yet**. Builds for other processors, and anything that isn't
  an installer (checksums, signatures), are left out; the build log lists the installers it left out.
- Sizes and SHA-256 come from GitHub, and a file is offered only once it has finished uploading.
- While no release is marked Latest (every one is a pre-release), the newest release is used.
- If GitHub can't be reached, the build still finishes: pages show `fallbackVersion` from
  `src/lib/release.ts`, and every download opens the latest release on GitHub. The log says why.
- Without a token, GitHub allows 60 API requests an hour from one address, and a build makes one or
  two. If builds share an address with other GitHub API traffic, set `GITHUB_TOKEN` (a token with no
  scopes is enough for a public repository). It's read during the build and never reaches the browser.
- The repository must stay public for visitors to download the files.

## Writing docs

Each page is `src/app/docs/<slug>/page.mdx`. Start it with its metadata, then add it to
`src/lib/docs-nav.ts`:

```mdx
export const metadata = { title: "Page title", description: "One sentence for search results." };

<p className="kicker">Section</p>

# Page title
```

GitHub-flavoured Markdown works, including tables. These components are available without importing:

- `<Callout type="note | tip | warning | pro" title="...">…</Callout>`
- `<Steps>` … `</Steps>`: every `###` heading inside becomes a numbered step.
- `<Screenshot name="overview" caption="..." />`: any name from `src/lib/screens.ts`.
- `<ReleaseFile name="dmg | installer | deb" />`: that file of the latest release, as inline code.
- `<AptInstall />`: the Terminal command that installs the latest release's `.deb`.

In MDX, `<` and `{` start JSX, so write paths like `/srv/<app>` inside backticks.

## Screenshots

The screenshots are the real app, drawn offscreen over its own test rig's sample server, so they
change only when the app does. To redraw them after a UI change, from the app's repository:

```bash
PYTHONDONTWRITEBYTECODE=1 QT_QPA_PLATFORM=offscreen QT_SCALE_FACTOR=2 \
  .venv/bin/python ../NativeVM-frontend/scripts/capture-screens.py ../NativeVM-frontend/src/assets/screenshots
```

Nothing is written into the app's repository, nothing connects to a server, and the keychain is an
in-memory stand-in.

## Fonts

Archivo is self-hosted from `src/app/fonts/` under the SIL Open Font License (`OFL.txt`), so a build
never waits on a font server. It's the variable Latin subset Google Fonts serves, with weight and
width axes.
