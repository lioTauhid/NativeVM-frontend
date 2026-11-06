import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Native VM: your own servers, run from your desk.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The app's Overview, read once at build time rather than on every request. */
async function screenshotDataUrl(): Promise<string> {
  "use cache";
  const screenshot = await readFile(join(process.cwd(), "src/assets/screenshots/overview.png"));
  return `data:image/png;base64,${screenshot.toString("base64")}`;
}

/** The card shown when a link to the site is shared: the tagline beside the real app. */
export default async function OpengraphImage() {
  const src = await screenshotDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#201e1d",
          color: "#ffffff",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: 140,
            width: 760,
            height: 560,
            display: "flex",
            background: "radial-gradient(closest-side, rgba(13,148,136,0.55), rgba(13,148,136,0) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 0 72px", width: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="56" height="56" viewBox="0 0 100 100">
              <polygon
                points="50,6 88.1,28 88.1,72 50,94 11.9,72 11.9,28"
                fill="#0d9488"
                stroke="#0d9488"
                strokeWidth="9"
                strokeLinejoin="round"
              />
              <rect x="26" y="29.5" width="48" height="12" rx="3.5" fill="#ffffff" />
              <rect x="26" y="44" width="48" height="12" rx="3.5" fill="#ffffff" />
              <rect x="26" y="58.5" width="48" height="12" rx="3.5" fill="#ffffff" />
              <circle cx="66" cy="35.5" r="2.8" fill="#16a34a" />
              <circle cx="66" cy="50" r="2.8" fill="#16a34a" />
              <circle cx="66" cy="64.5" r="2.8" fill="#16a34a" />
            </svg>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>Native VM</div>
          </div>
          <div
            style={{
              marginTop: 64,
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Your own servers,</span>
            <span style={{ color: "#5ccfc0" }}>run from your desk.</span>
          </div>
          <div style={{ marginTop: 30, fontSize: 26, lineHeight: 1.4, color: "rgba(255,255,255,0.68)" }}>
            One-click deploys to your own servers. Your credentials never leave your computer.
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <span
              style={{
                padding: "4px 10px",
                border: "1px solid rgba(92,207,192,0.6)",
                color: "#5ccfc0",
                fontWeight: 600,
                letterSpacing: 2,
                fontSize: 16,
              }}
            >
              BETA
            </span>
            <span>macOS</span>
            <span>·</span>
            <span>Windows</span>
            <span>·</span>
            <span>Linux</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 690,
            top: 96,
            width: 840,
            display: "flex",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          <img src={src} width={840} height={525} alt="" style={{ width: 840, height: 525 }} />
        </div>
      </div>
    ),
    size,
  );
}
