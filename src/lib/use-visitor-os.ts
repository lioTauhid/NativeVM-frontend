import { useSyncExternalStore } from "react";

import type { OperatingSystem } from "@/lib/release";

const subscribe = () => () => {};

/** The visitor's desktop system, or null for a phone, a tablet or one we can't tell. */
function detect(): OperatingSystem | null {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const name = `${nav.userAgentData?.platform ?? ""} ${nav.userAgent}`.toLowerCase();
  if (/iphone|ipad|android|mobile/.test(name)) return null;
  if (name.includes("mac")) return "macOS";
  if (name.includes("win")) return "Windows";
  if (name.includes("linux") || name.includes("x11")) return "Linux";
  return null;
}

/**
 * For client components: the visitor's desktop system, read in the browser. It is null
 * while rendering on the server, so the first paint never guesses.
 */
export function useVisitorOs(): OperatingSystem | null {
  return useSyncExternalStore(subscribe, detect, () => null);
}
