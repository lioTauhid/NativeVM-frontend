import type { StaticImageData } from "next/image";

import appDeploying from "@/assets/screenshots/app-deploying.png";
import appDeploys from "@/assets/screenshots/app-deploys.png";
import appOverview from "@/assets/screenshots/app-overview.png";
import apps from "@/assets/screenshots/apps.png";
import cron from "@/assets/screenshots/cron.png";
import domains from "@/assets/screenshots/domains.png";
import launcher from "@/assets/screenshots/launcher.png";
import newApp from "@/assets/screenshots/new-app.png";
import overview from "@/assets/screenshots/overview.png";
import services from "@/assets/screenshots/services.png";
import signIn from "@/assets/screenshots/sign-in.png";
import ssl from "@/assets/screenshots/ssl.png";

/**
 * Screenshots of the real app, drawn offscreen over its test rig's sample server
 * (kestrel-prod-01). Each has the window title the app would show.
 */
export type Screen = { image: StaticImageData; alt: string; title: string };

export const screens = {
  overview: {
    image: overview,
    title: "kestrel-prod-01 · Overview",
    alt: "Native VM's server overview: an app that needs attention, a certificate that expires in six days, live CPU, memory, disk and network meters, the apps and recent activity.",
  },
  apps: {
    image: apps,
    title: "kestrel-prod-01 · Apps",
    alt: "The Apps page listing four apps with their runtime, domain, certificate, status, last deploy and where each listens.",
  },
  appOverview: {
    image: appOverview,
    title: "kestrel-api · Overview",
    alt: "An app's page showing how it connects, from domain and SSL through nginx and its systemd service to its code, with live log output.",
  },
  appDeploys: {
    image: appDeploys,
    title: "kestrel-api · Deploys",
    alt: "An app's Deploys tab with its repository and release history, each older release offering Roll back.",
  },
  appDeploying: {
    image: appDeploying,
    title: "kestrel-api · Deploying",
    alt: "A deploy in progress: the code is fetched and the release prepared, Install and build is running, and its output streams beside the steps.",
  },
  newApp: {
    image: newApp,
    title: "New app",
    alt: "The New app wizard's first step: a grid of frameworks including Django, FastAPI, Flask, Go, ASP.NET Core, Spring Boot, Express, Next.js, Node.js and Static site.",
  },
  domains: {
    image: domains,
    title: "kestrel-prod-01 · Domains",
    alt: "The Domains page: each domain with its app, whether its DNS points at this server, and its HTTPS status.",
  },
  ssl: {
    image: ssl,
    title: "kestrel-prod-01 · SSL",
    alt: "The SSL certificates page: two valid certificates, one needing attention, each with days left and a Renew now button.",
  },
  services: {
    image: services,
    title: "kestrel-prod-01 · Services",
    alt: "The Services page: each app's systemd service, then every running or failed service on the server.",
  },
  cron: {
    image: cron,
    title: "kestrel-prod-01 · Cron jobs",
    alt: "The Cron jobs page: four jobs with their schedule in words, who they run as, and their next run.",
  },
  launcher: {
    image: launcher,
    title: "Servers",
    alt: "The Servers window: saved servers grouped by client or project, with Connect a server and Import from SSH config.",
  },
  signIn: {
    image: signIn,
    title: "Native VM",
    alt: "The Native VM sign-in window.",
  },
} satisfies Record<string, Screen>;

export type ScreenName = keyof typeof screens;
