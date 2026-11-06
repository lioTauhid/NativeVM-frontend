# Native VM website

The website for [Native VM](https://nativevm.com), the desktop app that provisions,
deploys and operates apps on your own Linux servers over SSH only: the product page,
downloads, and the documentation.

Built with Next.js 16 (App Router, Turbopack, Cache Components), Tailwind CSS 4 and MDX.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, with type checking
npm run start      # serve the production build
npm run lint
```

## What's where

| Path | What belongs there |
|---|---|
| `src/app/page.tsx` | The home page, assembled from `src/components/home/`. |
| `src/app/download/` | The Download page. |
| `src/app/docs/**/page.mdx` | The documentation, one MDX file per page. |
| `src/lib/docs-nav.ts` | The docs sidebar, its order, and so the previous/next links. |
| `src/lib/release.ts` | **The current version and its download files.** |
| `src/lib/site.ts` | Name, contact details, account links, the main navigation. |
| `src/lib/plans.ts` | What the Free and Pro plans allow. |
| `src/lib/frameworks.ts` | The framework tiles and runtime versions. |
| `src/lib/screens.ts` | The app screenshots and their alt text. |
| `src/assets/screenshots/` | Screenshots of the real app (see below). |
| `src/mdx-components.tsx` | How MDX renders, and the components docs can use. |
| `src/app/globals.css` | Design tokens, taken from the app's `ui/theme/tokens.py`, and docs typography. |

The look follows the desktop app's own design system: Archivo, one ink colour, the logo's teal for
actions, red only for what needs attention, square corners and status marks.

## Publishing a release

1. Upload the files the app's `make package` writes (for example
   `NativeVM-0.1.0-macos-arm64.dmg`) to the GitHub release for the tag `v<version>`, or to any host.
2. In `src/lib/release.ts`, set `version`, flip `available` on each platform you uploaded, and fill
   in the sizes. Add a `sha256` only from the exact file you published.
3. To serve the files from somewhere other than GitHub releases, set
   `NEXT_PUBLIC_DOWNLOAD_BASE_URL` to the folder that holds them.

By default, downloads point at `https://github.com/lioTauhid/NativePanel/releases/download/v<version>/`,
the same repository the app's **Check for updates** reads. That repository must be public, or the
release must be hosted elsewhere, for visitors to download it.

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
