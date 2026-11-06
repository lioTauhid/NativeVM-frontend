/**
 * The New app wizard's framework grid, with each tile's badge as the app draws it
 * (ui/dialogs/framework.py): a colour and a monogram or a Lucide glyph. No
 * framework's logo is used.
 */
export type Framework = {
  key: string;
  label: string;
  runtime: string;
  summary: string;
  colour: string;
  /** A monogram, or the name of a Lucide icon. */
  monogram?: string;
  icon?: "zap" | "flask-conical" | "hexagon" | "file-code" | "leaf" | "code-xml";
};

export const frameworks: Framework[] = [
  {
    key: "django",
    label: "Django",
    runtime: "Python",
    summary: "Full-stack web framework, served by gunicorn",
    colour: "#0c4b33",
    monogram: "dj",
  },
  {
    key: "fastapi",
    label: "FastAPI",
    runtime: "Python",
    summary: "Fast APIs with automatic docs, served by uvicorn",
    colour: "#009688",
    icon: "zap",
  },
  {
    key: "flask",
    label: "Flask",
    runtime: "Python",
    summary: "A small web framework, served by gunicorn",
    colour: "#201e1d",
    icon: "flask-conical",
  },
  {
    key: "go",
    label: "Go",
    runtime: "Linux binary",
    summary: "A binary you built for Linux, run as it is: no Go on the server",
    colour: "#00add8",
    monogram: "go",
  },
  {
    key: "aspnetcore",
    label: "ASP.NET Core",
    runtime: ".NET",
    summary: "Your dotnet publish output, on .NET installed for it or self-contained",
    colour: "#512bd4",
    monogram: "net",
  },
  {
    key: "spring-boot",
    label: "Spring Boot",
    runtime: "Java",
    summary: "Your app's jar, on Java installed for it or self-contained",
    colour: "#6db33f",
    icon: "leaf",
  },
  {
    key: "express",
    label: "Express",
    runtime: "Node.js",
    summary: "Minimal, flexible web server for Node.js",
    colour: "#605d5d",
    monogram: "ex",
  },
  {
    key: "nextjs",
    label: "Next.js",
    runtime: "Node.js",
    summary: "React framework for sites and web apps, served by next start",
    colour: "#000000",
    monogram: "N",
  },
  {
    key: "node",
    label: "Node.js",
    runtime: "Node.js",
    summary: "Any JavaScript or TypeScript app, run by its own start script",
    colour: "#5fa04e",
    icon: "hexagon",
  },
  {
    key: "static",
    label: "Static site",
    runtime: "Node.js",
    summary: "Plain files, or a front end's build: React, Vue, Angular, Svelte",
    colour: "#e34f26",
    icon: "file-code",
  },
  {
    key: "openclaw",
    label: "OpenClaw",
    runtime: "Node.js",
    summary: "Your own AI assistant: its Gateway and Control UI, installed from npm",
    colour: "#e0443e",
    monogram: "oc",
  },
  {
    key: "other",
    label: "Other",
    runtime: "Any",
    summary: "Your own start command, for code the grid does not name",
    colour: "transparent",
    icon: "code-xml",
  },
];
