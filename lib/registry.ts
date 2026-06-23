import path from "node:path";

import { readFileFromRoot } from "@/lib/read-file";

export const readOptionalFromRoot = async (
  relativePath: string
): Promise<string | null> => {
  try {
    return await readFileFromRoot(relativePath);
  } catch {
    return null;
  }
};

const REGISTRY_CATEGORIES = [
  "blogging",
  "events",
  "form",
  "list",
  "miscellaneous",
  "payment",
  "social",
  "status",
];

export const getRegistryUiSourceCandidates = ({ name }: { name: string }) =>
  REGISTRY_CATEGORIES.map((category) =>
    path.join("registry", category, `${name}.tsx`)
  );

export const getDemoSource = (name: string): Promise<string | null> =>
  readOptionalFromRoot(path.join("examples", `${name}.tsx`));

export const getRegistrySource = async (
  name: string
): Promise<string | null> => {
  const candidates = getRegistryUiSourceCandidates({ name });

  for (const candidate of candidates) {
    const code = await readOptionalFromRoot(candidate);
    if (code) {
      return code;
    }
  }

  return null;
};
