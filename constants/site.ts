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
    LONG: "Composition-first React blocks for building polished MCP Apps, distributed through a shadcn-compatible registry.",
    SHORT: "Compound components for MCP Apps",
  },
  KEYWORDS: [
    "shadcn",
    "shadcn registry",
    "component registry",
    "MCP Apps",
    "compound components",
    "next.js",
    "tailwindcss",
    "npx shadcn add",
  ] as const,
  NAME: "mcpcn",
  OG_IMAGE: `${baseUrl}/og`,
  REGISTRY: baseUrl,
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
  { href: ROUTES.LLMS, name: "llms.txt" },
  // { href: ROUTES.DOCS_CHANGELOG, name: "Changelog" },
];
