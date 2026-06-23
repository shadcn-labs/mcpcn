import Link from "next/link";

import { isBlocksFolder, formatTitleFromSlug } from "@/lib/docs";
import type { PageTreeFolder, PageTreePage } from "@/lib/page-tree";
import { getPagesFromFolder } from "@/lib/page-tree";
import { source } from "@/lib/source";

const getFolder = (name: string): PageTreeFolder | undefined => {
  for (const node of source.pageTree.children) {
    if (node.type === "folder" && node.name === name) {
      return node;
    }
  }
};

const getCategoryFolder = (
  blocksFolder: PageTreeFolder,
  category: string
): PageTreeFolder | undefined => {
  for (const child of blocksFolder.children) {
    if (child.type === "folder" && child.name === category) {
      return child;
    }
  }
};

const BlockGrid = ({ pages }: { pages: PageTreePage[] }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
    {pages.map((block) => (
      <Link
        className="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
        href={block.url}
        key={block.$id}
        transitionTypes={["nav-forward"]}
      >
        {block.name}
      </Link>
    ))}
  </div>
);

export const BlocksList = ({
  folderName = "Blocks",
  category,
}: {
  folderName?: string;
  category?: string;
}) => {
  const folder = getFolder(folderName);
  if (!folder) {
    return null;
  }

  if (!isBlocksFolder(folder)) {
    const pages = getPagesFromFolder(folder);
    if (pages.length === 0) {
      return null;
    }
    return <BlockGrid pages={pages} />;
  }

  if (category) {
    const categoryFolder = getCategoryFolder(folder, category);
    if (!categoryFolder) {
      return null;
    }
    const pages = getPagesFromFolder(categoryFolder);
    if (pages.length === 0) {
      return null;
    }
    return <BlockGrid pages={pages} />;
  }

  const categories = folder.children.filter(
    (child): child is PageTreeFolder => child.type === "folder"
  );

  return categories.map((cat) => {
    const pages = getPagesFromFolder(cat);
    if (pages.length === 0) {
      return null;
    }
    return (
      <section key={cat.$id}>
        <h2 className="mb-4 text-lg font-medium tracking-tight">
          {formatTitleFromSlug(String(cat.name))}
        </h2>
        <BlockGrid pages={pages} />
      </section>
    );
  });
};
