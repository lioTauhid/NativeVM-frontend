"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The address that wasn't found. Read in the browser: the 404 page is prerendered once,
 * so the server can't know it.
 */
export function MissingPath() {
  const path = useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => "",
  );
  return <>{path || "/…"}</>;
}
