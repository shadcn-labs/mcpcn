import { ROUTES } from "./routes";

export const FALLBACK_SITE_ORIGIN = "https://mcpcn.dev" as const;

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    NAME: "Aniket Pawar",
    TWITTER: "@alaymanguy",
  },
  DESCRIPTION: {
    LONG: "A collection of beautifully designed, accessible, and customizable MCP App UI components. Built with Base UI. Works with shadcn/ui.",
    SHORT: "Beautiful MCP UIs, made simple",
  },
  KEYWORDS: [
    "shadcn",
    "shadcn registry",
    "component registry",
    "MCP Apps",
    "mcp ui",
    "mcp app ui",
    "mcp app components",
    "mcp app blocks",
    "mcp app registry",
    "chatgpt app ui",
    "chatgpt app components",
    "chatgpt app blocks",
    "chatgpt app registry",
    "claude app ui",
    "claude app components",
    "claude app blocks",
    "claude app registry",
    "next.js",
    "tailwindcss",
    "npx shadcn add",
  ] as const,
  NAME: "mcpcn",
  OG_IMAGE: `${baseUrl}/og.png`,
  REGISTRY: "@mcpcn",
  URL: baseUrl,
};

export const META_THEME_COLORS = {
  dark: "#09090b",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};

export const TOP_LEVEL_SECTIONS = [
  { href: ROUTES.DOCS, name: "Introduction" },
  { href: ROUTES.DOCS_INSTALLATION, name: "Installation" },
  { href: ROUTES.DOCS_BLOCKS, name: "Blocks" },
  { href: ROUTES.DOCS_MCP, name: "MCP" },
  { href: ROUTES.DOCS_REGISTRY, name: "Registry" },
  { href: ROUTES.LLMS, name: "llms.txt" },
  // { href: ROUTES.DOCS_CHANGELOG, name: "Changelog" },
];
