import Link from "next/link";

import { isBlocksFolder, formatTitleFromSlug } from "@/lib/docs";
import type { PageTreeFolder, PageTreePage } from "@/lib/page-tree";
import { getPagesFromFolder } from "@/lib/page-tree";
import { source } from "@/lib/source";

const getFolder = (name: string): PageTreeFolder | undefined => {
  const folders = [...source.pageTree.children];

  while (folders.length > 0) {
    const node = folders.shift();
    if (node?.type === "folder") {
      if (
        node.$id === name ||
        String(node.name).toLocaleLowerCase() === name.toLocaleLowerCase()
      ) {
        return node;
      }
      folders.push(...node.children);
    }
  }
};

const getCategoryFolder = (
  blocksFolder: PageTreeFolder,
  category: string
): PageTreeFolder | undefined => {
  for (const child of blocksFolder.children) {
    if (
      child.type === "folder" &&
      (child.$id === category ||
        String(child.name).toLocaleLowerCase() === category.toLocaleLowerCase())
    ) {
      return child;
    }
  }
};

const BlockGrid = ({ pages }: { pages: PageTreePage[] }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20 mt-4">
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
  categoryName,
}: {
  folderName?: string;
  categoryName?: string;
}) => {
  const folder = getFolder(folderName);
  if (!folder) {
    return null;
  }

  if (!isBlocksFolder(folder)) {
    const pages = getPagesFromFolder(folder).filter(
      (page) => String(page.name) !== String(folder.name)
    );
    if (pages.length === 0) {
      return null;
    }
    return <BlockGrid pages={pages} />;
  }

  if (categoryName) {
    const categoryFolder = getCategoryFolder(folder, categoryName);
    if (!categoryFolder) {
      return null;
    }
    const pages = getPagesFromFolder(categoryFolder).filter(
      (page) => String(page.name) !== String(categoryFolder.name)
    );
    if (pages.length === 0) {
      return null;
    }
    return <BlockGrid pages={pages} />;
  }

  const categories = folder.children.filter(
    (child): child is PageTreeFolder => child.type === "folder"
  );

  return categories.map((cat) => {
    const pages = getPagesFromFolder(cat).filter(
      (page) => String(page.name) !== String(cat.name)
    );
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
