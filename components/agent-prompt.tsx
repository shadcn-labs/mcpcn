"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { motionIconProps } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { FALLBACK_SITE_ORIGIN, SITE } from "@/constants/site";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

const installCommand = `npx shadcn@latest add ${SITE.REGISTRY}/<block-name>`;

const agentInstallPrompt = `Read the ${SITE.NAME} agent instructions at ${FALLBACK_SITE_ORIGIN}${ROUTES.LLMS}, then inspect this project and identify the MCP App UI it needs. Browse the available blocks at ${FALLBACK_SITE_ORIGIN}${ROUTES.DOCS_BLOCKS}, choose the closest existing block, replace <block-name> in this command with that block's name, and run ${installCommand}. Configure the ${SITE.REGISTRY} registry alias if this project does not already have it, following ${FALLBACK_SITE_ORIGIN}${ROUTES.DOCS_REGISTRY}. Follow the installation guide at ${FALLBACK_SITE_ORIGIN}${ROUTES.DOCS_INSTALLATION}; use the block's documented API and wire it to this project's existing data and actions. Preserve the project's framework, Tailwind CSS, shadcn/ui configuration, and mcpcn's Base UI behavior. For a widget rendered in ChatGPT, consult ${FALLBACK_SITE_ORIGIN}${ROUTES.DOCS_APPS_SDK_UI} and add the optional apps-sdk-theme only if appropriate. Do not add unrelated Open Graph routes or rebuild a registry block from scratch. If installation fails, inspect ${FALLBACK_SITE_ORIGIN}/r/registry.json for the exact block name and registry files. Run the project's relevant typecheck or build after integration.`;

export const AgentPrompt = ({ className }: { className?: string }) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2500 });

  const handleCopy = async () => {
    const hasCopied = await copyToClipboard(agentInstallPrompt);

    if (hasCopied) {
      trackEvent({ name: "copy_agent_prompt" });
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      sound="copy"
      aria-live="polite"
      onClick={handleCopy}
      className={cn(
        "text-muted-foreground hover:text-foreground h-7 px-2.5",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isCopied ? (
          <motion.span key="done" {...motionIconProps}>
            <CheckIcon />
          </motion.span>
        ) : (
          <motion.span key="idle" {...motionIconProps}>
            <CopyIcon />
          </motion.span>
        )}
      </AnimatePresence>
      {isCopied
        ? "Copied — paste into your agent"
        : "Copy prompt for your agent"}
    </Button>
  );
};
