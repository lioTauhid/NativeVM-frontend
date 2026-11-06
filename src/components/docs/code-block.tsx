"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** A fenced code block, dark like the app's log pane, with a copy button. */
export function CodeBlock({ className, children, ...props }: ComponentProps<"pre">) {
  const pre = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

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
    <div className="group/code relative my-6">
      <pre
        ref={pre}
        {...props}
        className={cn(
          "overflow-x-auto bg-ink py-4 pr-14 pl-5 font-mono text-[13.5px] leading-[1.75] text-neutral-100 [&_code]:font-mono",
          className,
        )}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        className="absolute top-2.5 right-2.5 inline-flex size-8 items-center justify-center border border-white/15 bg-ink text-white/60 opacity-100 transition-[opacity,color] hover:text-white sm:opacity-0 sm:group-hover/code:opacity-100 sm:focus-visible:opacity-100"
      >
        {copied ? <Check className="size-4 text-accent-400" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
