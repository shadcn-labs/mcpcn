"use client";

import Link from "next/link";

import { ArrowRightIcon } from "@/components/animated-icons/arrow-right";
import type { ArrowRightIconHandle } from "@/components/animated-icons/arrow-right";
import { ComponentIcon } from "@/components/animated-icons/component";
import type { ComponentIconHandle } from "@/components/animated-icons/component";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useIconAnimation } from "@/hooks/use-icon-animation";
import { cn } from "@/lib/utils";

const GetStartedButton = () => {
  const { iconRef, onMouseEnter, onMouseLeave } =
    useIconAnimation<ArrowRightIconHandle>();

  return (
    <Button
      sound="click"
      nativeButton={false}
      className="px-4"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      render={
        <Link
          href={ROUTES.DOCS_INSTALLATION}
          transitionTypes={["nav-forward"]}
        />
      }
    >
      Get Started
      <ArrowRightIcon className="hidden sm:inline" ref={iconRef} />
    </Button>
  );
};

const BrowseBlocksButton = () => {
  const { iconRef, onMouseEnter, onMouseLeave } =
    useIconAnimation<ComponentIconHandle>();

  return (
    <Button
      variant="outline"
      sound="click"
      nativeButton={false}
      className="px-4"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      render={
        <Link href={ROUTES.DOCS_BLOCKS} transitionTypes={["nav-forward"]} />
      }
    >
      <ComponentIcon className="hidden sm:inline" ref={iconRef} size={22} />
      Browse Blocks
    </Button>
  );
};

export const HomeCtas = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-wrap items-center justify-center gap-4",
      className
    )}
  >
    <GetStartedButton />
    <BrowseBlocksButton />
  </div>
);
