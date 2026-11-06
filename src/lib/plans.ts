/**
 * What each plan allows, from the desktop app's core/plan.py and its README.
 * No price is shown: toolxbd.com is where plans are bought.
 */
export type PlanRow = {
  feature: string;
  detail?: string;
  free: string | boolean;
  pro: string | boolean;
};

export const planRows: PlanRow[] = [
  { feature: "Servers", free: "2", pro: "Unlimited" },
  { feature: "Apps created on each server", free: "2", pro: "Unlimited" },
  {
    feature: "Cron jobs on each server",
    free: "1",
    pro: "Unlimited",
  },
  { feature: "Terminal", free: true, pro: true },
  { feature: "Environment variables and .env upload", free: true, pro: true },
  {
    feature: "Wizard's advanced settings",
    detail: "Build and start commands, limits, socket or port",
    free: true,
    pro: true,
  },
  { feature: "Domains, HTTPS, deploys and rollback", free: true, pro: true },
  {
    feature: "Advanced mode",
    detail: "Every service, nginx config, logs and ports",
    free: false,
    pro: true,
  },
  { feature: "Live Monitor and Uninstaller", free: false, pro: true },
  {
    feature: "Files outside the apps",
    detail: "Home, logs and nginx config",
    free: false,
    pro: true,
  },
  { feature: "Apps from a private Git repository", free: false, pro: true },
];
