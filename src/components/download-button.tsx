"use client";

import { Download } from "lucide-react";

import { ButtonLink } from "@/components/ui";
import { useVisitorOs } from "@/lib/use-visitor-os";

/**
 * The main call to action: "Download for Windows" on Windows, and so on. Where the
 * system can't be told (a phone, or before the page has loaded), it offers the beta.
 */
export function DownloadButton({
  size = "lg",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const os = useVisitorOs();
  return (
    <ButtonLink href="/download" size={size} className={className}>
      <Download aria-hidden /> {os ? `Download for ${os}` : "Download the beta"}
    </ButtonLink>
  );
}
