"use client";

import { Check, GitCommitHorizontal, LoaderCircle, Rocket } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { Mark } from "@/components/ui";
import { cn } from "@/lib/cn";

/** The steps the app's Deploys tab lists, in its own words. */
const steps = ["Fetch the code", "Install and build", "Switch to the new release", "Start and check it is up"];

const older = { sha: "9f2c1ab", message: "Cache product lookups" };
const newest = { sha: "4e81d07", message: "Show delivery estimates" };

const stepMs = 850;

type StepState = "waiting" | "active" | "done";

function StepMark({ state }: { state: StepState }) {
  if (state === "done") {
    return (
      <span className="inline-flex size-5 shrink-0 items-center justify-center bg-accent text-white">
        <Check className="size-3.5" strokeWidth={3} aria-hidden />
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="inline-flex size-5 shrink-0 items-center justify-center border-[1.5px] border-accent">
        <span className="animate-blink size-2 bg-accent-400" />
      </span>
    );
  }
  return <span className="size-5 shrink-0 border-[1.5px] border-ink/20" />;
}

/**
 * An app's header and deploy, as a demo: press Re-Deploy and watch the newest commit on
 * main go live. Nothing leaves the page.
 */
export function RedeployDemo() {
  // null before the first deploy; the step running; steps.length once it's done.
  const [step, setStep] = useState<number | null>(null);
  const [live, setLive] = useState(older);
  const statusId = useId();
  const running = step !== null && step < steps.length;

  useEffect(() => {
    if (step === null || step >= steps.length) return;
    const timer = window.setTimeout(() => {
      if (step + 1 === steps.length) setLive(newest);
      setStep(step + 1);
    }, stepMs);
    return () => window.clearTimeout(timer);
  }, [step]);

  const status =
    step === null
      ? "Interactive demo: press Re-Deploy to ship the newest commit on main."
      : running
        ? `Deploying ${newest.sha}: ${steps[step].toLowerCase()}…`
        : `Deployed ${newest.sha}. The release before stays on the server, ready to roll back to.`;

  return (
    <div>
      <div className="border border-white/12 bg-white text-ink shadow-[0_40px_90px_-40px_rgba(13,148,136,0.55)]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="kicker">Apps / Web app</p>
            <p className="mt-1.5 text-2xl font-extrabold tracking-[-0.02em]">kestrel-api</p>
            <p className="mt-1 truncate text-[13px] text-neutral-600">
              api.kestrel.shop · main @ <span className="font-mono">{live.sha}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!running) setStep(0);
            }}
            aria-disabled={running}
            aria-describedby={statusId}
            className={cn(
              "inline-flex h-10 items-center gap-2 px-4 text-[15px] font-semibold text-white transition-colors",
              running ? "cursor-progress bg-accent-700" : "bg-accent hover:bg-accent-700",
              step === null && "animate-nudge",
            )}
          >
            {running ? (
              <>
                Deploying <LoaderCircle className="size-4 animate-spin" aria-hidden />
              </>
            ) : (
              <>
                Re-Deploy <Rocket className="size-4" aria-hidden />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-ink/10 bg-bg px-5 py-3.5 sm:px-6">
          <GitCommitHorizontal className="size-4 shrink-0 text-accent-700" aria-hidden />
          <p className="min-w-0 flex-1 truncate text-sm">
            {live.sha === newest.sha ? (
              "main is up to date"
            ) : (
              <>
                New on main: <span className="font-semibold">{newest.message}</span>
              </>
            )}
          </p>
          <span className="font-mono text-xs text-neutral-600">{newest.sha}</span>
        </div>

        <ol aria-label="Deploy steps" className="px-5 py-3 sm:px-6">
          {steps.map((label, index) => {
            const state: StepState =
              step === null || index > step ? "waiting" : index === step ? "active" : "done";
            return (
              <li key={label} className="flex items-center gap-3 py-2 text-[15px]">
                <StepMark state={state} />
                <span
                  className={cn(
                    state === "waiting" ? "text-neutral-500" : "text-ink",
                    state === "active" && "font-semibold",
                  )}
                >
                  {label}
                  {state === "done" ? <span className="sr-only">, done</span> : null}
                  {state === "active" ? <span className="sr-only">, in progress</span> : null}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="flex items-center gap-3 border-t border-ink/10 px-5 py-3.5 text-sm sm:px-6">
          <Mark tone={running ? "busy" : "ok"} className="text-accent" />
          <span className="kicker">Live</span>
          <span className="min-w-0 flex-1 truncate">
            <span className="font-mono text-[13px]">{live.sha}</span> · {live.message}
          </span>
        </div>
      </div>
      <p id={statusId} aria-live="polite" className="mt-3 text-sm text-white/55">
        {status}
      </p>
    </div>
  );
}
