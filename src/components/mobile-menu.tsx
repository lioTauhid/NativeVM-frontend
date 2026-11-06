"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { mainNav, site } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center text-white/80 hover:text-white"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-16 border-b border-white/10 bg-ink px-5 pt-2 pb-6 shadow-2xl"
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b border-white/10 py-3.5 text-[17px] font-semibold text-white/85 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/download"
              onClick={close}
              className="inline-flex h-12 items-center justify-center gap-2 bg-accent font-semibold text-white"
            >
              <Download className="size-4" aria-hidden /> Download the beta
            </Link>
            <a
              href={site.account.register}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center border border-white/25 font-semibold text-white"
            >
              Create a free account
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
