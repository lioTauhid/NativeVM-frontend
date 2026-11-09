"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/cn";
import { screens, type ScreenName } from "@/lib/screens";

type Step = {
  key: string;
  title: string;
  summary: string;
  points: string[];
  screen: ScreenName;
};

const steps: Step[] = [
  {
    key: "connect",
    title: "Connect your server",
    summary:
      "Add an Ubuntu or Debian server from any provider with its address and an SSH key or password, or import the servers you already use.",
    points: [
      "Nothing to set up on the server first: Native VM checks it for you.",
      "Your key and password stay on your computer.",
    ],
    screen: "launcher",
  },
  {
    key: "create",
    title: "Create an app",
    summary:
      "Pick your framework, point at a Git repository or a folder, and choose where it lives: your own domain, or a preview address to try it first.",
    points: [
      "Node.js, Python, Go, .NET and Java, each app on the version it needs.",
      "Native VM sets up everything the app needs to run, and to restart itself.",
    ],
    screen: "newApp",
  },
  {
    key: "deploy",
    title: "Deploy in one click",
    summary:
      "Native VM fetches your code, builds it and checks it's answering before it goes live. From then on, push to Git and press Deploy.",
    points: [
      "A build that fails never takes your site down.",
      "Roll back to an earlier release in one click.",
    ],
    screen: "appDeploying",
  },
  {
    key: "secure",
    title: "Turn on HTTPS",
    summary:
      "Point your domain at the server and switch on HTTPS. Certificates are free from Let's Encrypt, and renew on their own.",
    points: [
      "Your domain is checked first, so one that isn't ready yet never wastes a certificate.",
      "Renewal happens on the server, even while your computer is off.",
    ],
    screen: "ssl",
  },
  {
    key: "operate",
    title: "Run it day to day",
    summary:
      "Live logs, restarts, environment variables, scheduled jobs and a terminal, in one window per server.",
    points: [
      "Anything that needs you rises to the top of the overview.",
      "You see every change before it's made, and the original is backed up.",
    ],
    screen: "appOverview",
  },
];

export function Workflow() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (event.key in moves) next = (active + moves[event.key] + steps.length) % steps.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = steps.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-14">
      <div
        role="tablist"
        aria-label="From a bare server to a live app"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex flex-col border-t-2 border-ink"
      >
        {steps.map((step, index) => {
          const selected = index === active;
          return (
            <button
              key={step.key}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              id={`workflow-tab-${step.key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`workflow-panel-${step.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "group relative border-b border-ink/15 py-5 pr-4 pl-6 text-left transition-colors",
                selected ? "bg-white" : "hover:bg-white/60",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 bottom-0 left-0 w-[3px] transition-colors",
                  selected ? "bg-accent" : "bg-transparent group-hover:bg-ink/15",
                )}
              />
              <span className="flex items-baseline gap-4">
                <span
                  className={cn(
                    "font-wide text-2xl font-extrabold tabular-nums transition-colors",
                    selected ? "text-accent" : "text-neutral-400",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-bold tracking-[-0.01em]">{step.title}</span>
              </span>
              <span
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300",
                  selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <span className="overflow-hidden">
                  <span className="mt-3 block pl-[3.25rem] text-[15px] leading-relaxed text-neutral-700">
                    {step.summary}
                  </span>
                  <span className="mt-3 block space-y-2 pl-[3.25rem]">
                    {step.points.map((point) => (
                      <span key={point} className="flex gap-2.5 text-sm leading-snug text-neutral-700">
                        <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-accent" />
                        {point}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:sticky lg:top-24">
        {steps.map((step, index) => {
          const screen = screens[step.screen];
          const selected = index === active;
          return (
            <div
              key={step.key}
              id={`workflow-panel-${step.key}`}
              role="tabpanel"
              aria-labelledby={`workflow-tab-${step.key}`}
              aria-hidden={!selected}
              className={cn(
                "[grid-area:1/1] transition-[opacity,transform] duration-500",
                selected ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
              )}
            >
              <div className="overflow-hidden border border-ink/15 bg-white shadow-[0_40px_90px_-45px_rgba(32,30,29,0.55)]">
                <div className="flex h-8 items-center gap-1.5 border-b border-ink/10 bg-neutral-200 px-3">
                  <span className="size-2.5 bg-alert/80" />
                  <span className="size-2.5 bg-[#e8b339]" />
                  <span className="size-2.5 bg-led/80" />
                  <span className="mx-auto truncate px-4 text-xs font-medium text-neutral-600">
                    {screen.title}
                  </span>
                  <span className="w-[38px] shrink-0" aria-hidden />
                </div>
                <Image
                  src={screen.image}
                  alt={screen.alt}
                  sizes="(min-width: 1024px) 760px, 100vw"
                  quality={90}
                  placeholder="blur"
                  className="block h-auto w-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
