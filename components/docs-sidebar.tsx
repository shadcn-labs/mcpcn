"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import { TOP_LEVEL_SECTIONS } from "@/constants/site";
import { PAGES_NEW } from "@/lib/docs";
import { buildTreeGroups } from "@/lib/page-tree";
import type { source } from "@/lib/source";

const SidebarMenuItemLink = ({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
      isActive={isActive}
      render={<Link href={href} />}
    >
      <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
      {children}
      {PAGES_NEW.includes(href) && (
        <span className="flex size-2 rounded-full bg-blue-500" title="New" />
      )}
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const SidebarPageGroup = ({
  label,
  pages,
  pathname,
}: {
  label: React.ReactNode;
  pages: { url: string; name: React.ReactNode }[];
  pathname: string;
}) => {
  if (pages.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground font-medium">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {pages.map((page) => (
            <SidebarMenuItemLink
              key={page.url}
              href={page.url}
              isActive={page.url === pathname}
            >
              {page.name}
            </SidebarMenuItemLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const DocsSidebar = ({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) => {
  const pathname = usePathname();
  const treeGroups = buildTreeGroups(tree);

  return (
    <Sidebar
      className="text-sidebar-foreground sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] flex-col overscroll-none bg-transparent [--sidebar-menu-width:--spacing(48)] lg:flex"
      collapsible="none"
      {...props}
    >
      <div className="h-9" />
      <div className="absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-linear-to-b from-background via-background/80 to-background/50 blur-xs" />
      <div className="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-linear-to-b from-transparent via-border to-transparent lg:flex" />
      <SidebarContent className="mx-auto no-scrollbar w-(--sidebar-menu-width) overflow-x-hidden px-2">
        <SidebarGroup className="pt-6">
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOP_LEVEL_SECTIONS.map(({ name, href }) => (
                <SidebarMenuItemLink
                  key={name}
                  href={href}
                  isActive={
                    href === ROUTES.DOCS
                      ? pathname === href
                      : pathname.startsWith(href)
                  }
                >
                  {name}
                </SidebarMenuItemLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {treeGroups.map((group) => (
          <SidebarPageGroup
            key={
              typeof group.label === "string"
                ? group.label
                : group.label?.toString()
            }
            label={group.label}
            pages={group.pages}
            pathname={pathname}
          />
        ))}
        <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
      </SidebarContent>
    </Sidebar>
  );
};
