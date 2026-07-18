import { readFileFromRoot } from "@/lib/read-file";
import registry from "@/registry.json";

export const readOptionalFromRoot = async (
  relativePath: string
): Promise<string | null> => {
  try {
    return await readFileFromRoot(relativePath);
  } catch {
    return null;
  }
};

export const getRegistryUiSourceCandidates = ({ name }: { name: string }) =>
  registry.items
    .filter((item) => item.name === name)
    .flatMap((item) => item.files)
    .filter((file) => file.type === "registry:block")
    .map((file) => file.path);

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
