"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** What the bar above a block calls its language. A plain text block goes unnamed. */
const languageNames: Record<string, string> = {
  bash: "Terminal",
  sh: "Terminal",
  shell: "Terminal",
  zsh: "Terminal",
  json: "JSON",
  ini: "INI",
  nginx: "nginx",
  yaml: "YAML",
};

/**
 * A fenced code block, dark like the app's log pane, in a window with the app's square
 * controls, the block's language and a copy button. `fence` is the language named after
 * the opening ```, read on the server (see mdx-components.tsx).
 */
export function CodeBlock({
  className,
  children,
  fence,
  ...props
}: ComponentProps<"pre"> & { fence?: string }) {
  const pre = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const language = fence ? (languageNames[fence] ?? (fence === "text" ? "" : fence)) : "";

  async function copy() {
    const text = pre.current?.innerText.replace(/\n$/, "") ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="my-6 overflow-hidden border border-ink/80 bg-ink shadow-[0_24px_50px_-36px_rgba(32,30,29,0.7)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-[#1b1a19] pr-1.5 pl-3.5">
        <span aria-hidden className="size-2 bg-white/18" />
        <span aria-hidden className="size-2 bg-white/18" />
        <span aria-hidden className="size-2 bg-white/18" />
        {language ? (
          <span className="ml-3 text-[11.5px] font-semibold tracking-[0.1em] text-white/45 uppercase">
            {language}
          </span>
        ) : null}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className="ml-auto inline-flex h-7 items-center gap-1.5 px-2 text-[12px] font-semibold text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-accent-400" aria-hidden /> Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden /> Copy
            </>
          )}
        </button>
      </div>
      <pre
        ref={pre}
        {...props}
        className={cn(
          "overflow-x-auto px-5 py-4 font-mono text-[13.5px] leading-[1.75] text-neutral-100 [scrollbar-color:rgb(255_255_255/0.2)_transparent] [scrollbar-width:thin] [&_code]:font-mono",
          className,
        )}
      >
        {children}
      </pre>
    </div>
  );
}
