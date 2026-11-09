/**
 * What each plan allows, from the desktop app's core/plan.py and its README, worded for
 * people choosing a plan. No price is shown: toolxbd.com is where plans are bought.
 */
export type PlanRow = {
  feature: string;
  detail?: string;
  free: string | boolean;
  pro: string | boolean;
};

export const planRows: PlanRow[] = [
  { feature: "Servers", free: "2", pro: "Unlimited" },
  { feature: "Apps on each server", free: "2", pro: "Unlimited" },
  { feature: "Scheduled jobs on each server", free: "1", pro: "Unlimited" },
  { feature: "One-click deploys and rollback", free: true, pro: true },
  { feature: "Domains and free HTTPS", free: true, pro: true },
  { feature: "Environment variables and .env upload", free: true, pro: true },
  { feature: "Custom build and start commands", free: true, pro: true },
  { feature: "Terminal", free: true, pro: true },
  {
    feature: "Advanced mode",
    detail: "Every service on the server, its logs and settings",
    free: false,
    pro: true,
  },
  { feature: "Live Monitor and Uninstaller", free: false, pro: true },
  {
    feature: "Files outside your apps",
    detail: "Home folder, logs and web server settings",
    free: false,
    pro: true,
  },
  { feature: "Apps from a private Git repository", free: false, pro: true },
];
