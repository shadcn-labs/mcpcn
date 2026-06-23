"use client";

import { CheckCircle } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { createCompoundBlock } from "../_lib/compound";
import type { SharePlatform } from "./types";

interface ActionContext {
  [key: string]: unknown;
  onViewTickets?: () => void;
  onFollowOrganizer?: () => void;
  onShare?: (platform: SharePlatform) => void;
}

export interface EventConfirmationProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  onViewTickets?: () => void;
  onFollowOrganizer?: () => void;
  onShare?: (platform: SharePlatform) => void;
}

export const EventConfirmation = createCompoundBlock<
  ActionContext,
  EventConfirmationProps
>({
  buildContext: (props) => ({
    onFollowOrganizer: props.onFollowOrganizer,
    onShare: props.onShare,
    onViewTickets: props.onViewTickets,
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "EventConfirmation",
  renderDefault: () => (
    <div className="space-y-4">
      <EventConfirmation.Header>
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5" />
          <div>
            <p className="font-semibold">Eventconfirmation</p>
            <p className="text-sm text-muted-foreground">
              Composition-first MCP app block
            </p>
          </div>
        </div>
      </EventConfirmation.Header>
      <EventConfirmation.Details>
        <p className="text-sm text-muted-foreground">
          Sample details content that can be fully replaced by children.
        </p>
      </EventConfirmation.Details>
      <EventConfirmation.Organizer>
        <p className="text-sm text-muted-foreground">
          Sample organizer content that can be fully replaced by children.
        </p>
      </EventConfirmation.Organizer>
      <EventConfirmation.Share>
        <p className="text-sm text-muted-foreground">
          Sample share content that can be fully replaced by children.
        </p>
      </EventConfirmation.Share>
    </div>
  ),
  slots: {
    Details: { className: "grid gap-3 rounded-lg border p-4 sm:grid-cols-3" },
    Header: { className: "rounded-lg bg-muted/40 p-4" },
    Organizer: { className: "rounded-lg border bg-muted/30 p-4" },
    Share: { className: "flex flex-wrap items-center gap-2" },
  },
});
