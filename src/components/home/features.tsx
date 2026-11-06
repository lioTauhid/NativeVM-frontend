import {
  Activity,
  Cpu,
  FileDiff,
  Folder,
  LayoutGrid,
  PackageMinus,
  ShieldCheck,
  SquareTerminal,
  Timer,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { Container, Mark, Pill, SectionIntro } from "@/components/ui";
import { cn } from "@/lib/cn";

function Card({
  icon: Icon,
  title,
  children,
  visual,
  className,
  pro = false,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  visual?: ReactNode;
  className?: string;
  pro?: boolean;
}) {
  return (
    <article
      className={cn(
        "reveal group relative flex flex-col overflow-hidden border border-ink/12 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_30px_70px_-40px_rgba(13,148,136,0.55)]",
        className,
      )}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center bg-ink text-white transition-colors group-hover:bg-accent">
            <Icon className="size-[18px]" aria-hidden />
          </span>
          <h3 className="text-lg font-bold tracking-[-0.01em]">{title}</h3>
          {pro ? (
            <Pill tone="pro" className="ml-auto">
              Pro
            </Pill>
          ) : null}
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">{children}</p>
      </div>
      {visual ? <div className="mt-auto px-6 pb-6 sm:px-7 sm:pb-7">{visual}</div> : null}
    </article>
  );
}

const cpu = [38, 44, 41, 35, 30, 26, 22, 25, 31, 36, 40, 43, 47, 49, 46, 52, 55, 51, 48, 56, 60, 58, 54, 50];
const net = [20, 24, 26, 30, 28, 34, 44, 58, 66, 72, 60, 48, 40, 36, 38, 34, 30, 28, 36, 48, 62, 70, 78, 74];

function Spark({ values }: { values: number[] }) {
  return (
    <div className="flex h-12 items-end gap-[3px]" aria-hidden>
      {values.map((value, index) => (
        <span
          key={index}
          className={cn("w-full", index === values.length - 1 ? "bg-accent" : "bg-neutral-400/70")}
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  );
}

function OverviewVisual() {
  const meters = [
    { label: "CPU", value: "23%", note: "4 cores", spark: cpu },
    { label: "Memory", value: "3.4 GB", note: "of 8 GB", bar: 43 },
    { label: "Disk", value: "61 GB", note: "of 160 GB", bar: 40 },
    { label: "Network", value: "12 MB/s", note: "in", spark: net },
  ];
  return (
    <div className="grid grid-cols-2 border border-ink/12 bg-bg sm:grid-cols-4" aria-hidden>
      {meters.map((meter, index) => (
        <div
          key={meter.label}
          className={cn(
            "p-4",
            index % 2 === 1 && "border-l border-ink/12",
            index >= 2 && "border-t border-ink/12 sm:border-t-0",
            index === 2 && "sm:border-l",
          )}
        >
          <p className="kicker">{meter.label}</p>
          <p className="font-wide mt-1.5 text-2xl font-extrabold tracking-[-0.03em]">{meter.value}</p>
          <p className="text-xs text-neutral-600">{meter.note}</p>
          <div className="mt-3">
            {meter.spark ? (
              <Spark values={meter.spark} />
            ) : (
              <div className="flex h-12 items-end">
                <div className="h-2.5 w-full border border-ink/30 bg-white">
                  <div className="h-full bg-ink" style={{ width: `${meter.bar}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CertVisual() {
  const certs = [
    { name: "api.kestrel.shop", days: 74, width: 82, alert: false },
    { name: "docs.kestrel.shop", days: 51, width: 57, alert: false },
    { name: "admin.kestrel.shop", days: 6, width: 7, alert: true },
  ];
  return (
    <ul className="space-y-3.5" aria-hidden>
      {certs.map((cert) => (
        <li key={cert.name}>
          <div className="flex items-center justify-between gap-3 text-[13px]">
            <span className="flex items-center gap-2 font-semibold">
              <Mark tone={cert.alert ? "alert" : "ok"} /> {cert.name}
            </span>
            <span className={cert.alert ? "font-semibold text-alert" : "text-neutral-600"}>
              {cert.days} days
            </span>
          </div>
          <div className="mt-1.5 h-1.5 bg-neutral-200">
            <div
              className={cert.alert ? "h-full bg-alert" : "h-full bg-ink"}
              style={{ width: `${cert.width}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function LogVisual() {
  const lines = [
    ["09:15:31", "[INFO] Booting worker with pid: 48215", false],
    ["09:15:32", "[INFO] Application startup complete.", false],
    ["09:16:47", '"GET /v1/products/8812 HTTP/1.1" 200', false],
    ["09:17:09", "Slow query: product search took 812 ms", true],
    ["09:17:42", '"POST /v1/checkout HTTP/1.1" 201', false],
  ] as const;
  return (
    <div className="bg-ink p-4 font-mono text-[11.5px] leading-[1.75] text-white/80" aria-hidden>
      <p className="mb-1 flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.1em] text-white/45 uppercase">
        <Mark tone="busy" /> Live · kestrel-api.service
      </p>
      {lines.map(([time, text, bad]) => (
        <p key={time} className="truncate">
          <span className="text-white/35">{time}</span>{" "}
          <span className={bad ? "text-alert-400" : undefined}>{text}</span>
        </p>
      ))}
    </div>
  );
}

function CronVisual() {
  const jobs = [
    { name: "nightly-backup", cron: "0 2 * * *", words: "Every day at 02:00", on: true },
    { name: "digest-email", cron: "*/30 8-18 * * mon-fri", words: "Weekdays, every 30 min", on: true },
    { name: "rotate-uploads", cron: "15 4 * * sun", words: "Paused", on: false },
  ];
  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10" aria-hidden>
      {jobs.map((job) => (
        <li key={job.name} className="flex items-center gap-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold">{job.name}</p>
            <p className="truncate font-mono text-[11.5px] text-neutral-600">{job.cron}</p>
          </div>
          <span className="text-right text-xs text-neutral-600">{job.words}</span>
          <span
            className={cn(
              "inline-flex h-4 w-7 shrink-0 items-center border border-ink/20 p-0.5",
              job.on ? "justify-end bg-accent" : "justify-start bg-neutral-200",
            )}
          >
            <span className="size-2.5 bg-white" />
          </span>
        </li>
      ))}
    </ul>
  );
}

function TerminalVisual() {
  return (
    <div className="overflow-hidden bg-ink p-4 font-mono text-[12px] leading-[1.8] whitespace-pre text-white/85" aria-hidden>
      <p className="mb-1 font-sans text-[11px] font-semibold tracking-[0.1em] text-white/45 uppercase">
        SSH · deploy@kestrel-prod-01 · 18 ms
      </p>
      <p>
        <span className="text-accent-400">deploy@kestrel</span>
        <span className="text-white/40">:</span>
        <span className="text-[#8ab4f8]">~</span>$ systemctl is-active nginx
      </p>
      <p className="text-white/55">active</p>
      <p>
        <span className="text-accent-400">deploy@kestrel</span>
        <span className="text-white/40">:</span>
        <span className="text-[#8ab4f8]">~</span>${" "}
        <span className="animate-blink inline-block h-[1.05em] w-[0.55em] translate-y-[2px] bg-white/85" />
      </p>
    </div>
  );
}

function FilesVisual() {
  const rows = [
    { depth: 0, name: "/srv/kestrel-api", folder: true },
    { depth: 1, name: "current → releases/…-4e81d07", folder: true },
    { depth: 1, name: "releases", folder: true },
    { depth: 1, name: "shared", folder: true },
    { depth: 2, name: ".env", folder: false, note: "0600" },
  ];
  return (
    <ul className="space-y-1.5 font-mono text-[12px]" aria-hidden>
      {rows.map((row) => (
        <li key={row.name} className="flex items-center gap-2" style={{ paddingLeft: `${row.depth * 16}px` }}>
          <span className={cn("size-2 shrink-0", row.folder ? "bg-ink" : "border-[1.5px] border-ink")} />
          <span className="truncate">{row.name}</span>
          {row.note ? <span className="ml-auto text-neutral-500">{row.note}</span> : null}
        </li>
      ))}
    </ul>
  );
}

function DiffVisual() {
  return (
    <div className="border border-ink/12 font-mono text-[12px] leading-[1.75]" aria-hidden>
      <p className="border-b border-ink/12 bg-bg px-4 py-2 font-sans text-[12px] font-semibold text-neutral-700">
        /etc/nginx/sites-available/shop.kestrel.co
      </p>
      <div className="overflow-x-auto px-4 py-3 whitespace-pre">
        <p className="text-neutral-500">{"  server {"}</p>
        <p className="text-neutral-500">{"      listen 80;"}</p>
        <p className="bg-alert-100 text-alert-700">{"-     server_name shop.kestrel.co;"}</p>
        <p className="bg-accent-100 text-accent-800">{"+     server_name shop.kestrel.co www.kestrel.co;"}</p>
        <p className="text-neutral-500">{"      location / { proxy_pass http://127.0.0.1:8001; }"}</p>
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-ink/12 bg-bg px-4 py-2.5 font-sans">
        <span className="border border-ink/40 px-3 py-1 text-[12px] font-semibold">Cancel</span>
        <span className="bg-accent px-3 py-1 text-[12px] font-semibold text-white">Apply</span>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-bg py-24 sm:py-32">
      <Container>
        <SectionIntro kicker="One window per server" title="Everything a server needs. Nothing it doesn't.">
          <p>
            Each server gets its own window: its apps, domains, certificates, services, cron jobs,
            files and a terminal, all over the one SSH connection.
          </p>
        </SectionIntro>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={LayoutGrid}
            title="An overview that points at the problem"
            className="md:col-span-2"
            visual={<OverviewVisual />}
          >
            Live CPU, memory, disk and network, read from the kernel&apos;s own /proc rather than
            scraped from top. A crashed app or a certificate about to expire sits at the top, next to
            the button that fixes it.
          </Card>
          <Card icon={ShieldCheck} title="HTTPS that checks DNS first" visual={<CertVisual />}>
            Let&apos;s Encrypt certificates, issued only once your domain really points at the
            server. Amber under 21 days, red under 7.
          </Card>
          <Card icon={Activity} title="Services and live logs" visual={<LogVisual />}>
            Start, stop and restart systemd services and follow their journal live. When lines pour
            in too fast, Native VM drops from the middle and tells you how many.
          </Card>
          <Card icon={Timer} title="Cron jobs that report back" visual={<CronVisual />}>
            Write a cron schedule; get a systemd timer that knows when it last ran, how it ended and
            what it printed. Pause it without deleting it.
          </Card>
          <Card icon={SquareTerminal} title="A real terminal" visual={<TerminalVisual />}>
            Tabs share the server&apos;s one connection. Full-screen programs reflow as you resize,
            with 10,000 lines of scrollback.
          </Card>
          <Card
            icon={FileDiff}
            title="Every change is a diff first"
            className="md:col-span-2"
            visual={<DiffVisual />}
          >
            Adding a domain, turning on HTTPS, saving a file or an app&apos;s environment: you see
            exactly what changes, and nothing is sent until you press Apply. If the server&apos;s copy
            changed since you opened it, the save is refused, never forced.
          </Card>
          <Card icon={Folder} title="Files, saved atomically" visual={<FilesVisual />}>
            Browse and edit over SFTP, move folders with rsync. Every write is a temp file and a
            rename, so a dropped connection never leaves half a config.
          </Card>
          <Card icon={Cpu} title="Live Monitor" pro>
            The real htop, running on the server only while you&apos;re looking at it. Missing on a
            fresh server? It&apos;s installed for you.
          </Card>
          <Card icon={PackageMinus} title="Uninstaller" pro className="md:col-span-1 lg:col-span-2">
            See every package installed on request, then remove one with a plan that names each
            package going with it, the space freed and what stops working. Native VM removes exactly
            that list, or nothing.
          </Card>
        </div>
      </Container>
    </section>
  );
}
