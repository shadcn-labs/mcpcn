import type {
  Node as PageTreeNode,
  Root as PageTreeRoot,
} from "fumadocs-core/page-tree";
import type { ReactNode } from "react";

import { EXCLUDED_SECTIONS } from "@/lib/docs";

export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>;
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>;

export const getPagesFromFolder = (folder: PageTreeFolder): PageTreePage[] =>
  folder.children.filter(
    (child): child is PageTreePage => child.type === "page"
  );

export const getAllPagesFromFolder = (
  folder: PageTreeFolder
): PageTreePage[] => {
  const pages: PageTreePage[] = [];

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child);
    } else if (child.type === "folder") {
      pages.push(...getAllPagesFromFolder(child));
    }
  }

  return pages;
};

export interface TreeGroup {
  label: ReactNode;
  pages: { url: string; name: ReactNode }[];
}

const isBlocksFolder = (folder: PageTreeFolder) =>
  folder.$id === "blocks" || folder.name === "Blocks";

export const buildTreeGroups = (tree: PageTreeRoot): TreeGroup[] => {
  const groups: TreeGroup[] = [];

  for (const item of tree.children) {
    if (item.type !== "folder") {
      continue;
    }
    if (EXCLUDED_SECTIONS.has(item.$id ?? "")) {
      continue;
    }

    if (isBlocksFolder(item)) {
      const categories = item.children.filter(
        (child): child is PageTreeFolder => child.type === "folder"
      );
      for (const category of categories) {
        const pages = getPagesFromFolder(category).filter(
          (page) => String(page.name) !== String(category.name)
        );
        if (pages.length > 0) {
          groups.push({
            label: category.name,
            pages: pages.map((p) => ({ name: p.name, url: p.url })),
          });
        }
      }
      continue;
    }

    const pages = getPagesFromFolder(item);
    if (pages.length > 0) {
      groups.push({
        label: item.name,
        pages: pages.map((p) => ({ name: p.name, url: p.url })),
      });
    }
  }

  return groups;
};
