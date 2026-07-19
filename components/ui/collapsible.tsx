"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import * as React from "react";

import { collapse, expand } from "@/audio/core";
import { useFeedback } from "@/hooks/use-feedback";

const Collapsible = ({
  onOpenChange,
  sounds = false,
  ...props
}: CollapsiblePrimitive.Root.Props & { sounds?: boolean }) => {
  const playExpand = useFeedback({ soundDef: expand });
  const playCollapse = useFeedback({ soundDef: collapse });
  const isControlled = props.open !== undefined;
  const lastOpen = React.useRef(props.open ?? props.defaultOpen ?? false);

  const playStateSound = React.useCallback(
    (open: boolean) => {
      if (!sounds || open === lastOpen.current) {
        return;
      }

      if (open) {
        playExpand();
      } else {
        playCollapse();
      }

      lastOpen.current = open;
    },
    [playCollapse, playExpand, sounds]
  );

  React.useEffect(() => {
    if (isControlled) {
      playStateSound(props.open ?? false);
    }
  }, [isControlled, playStateSound, props.open]);

  const handleOpenChange = React.useCallback<
    NonNullable<CollapsiblePrimitive.Root.Props["onOpenChange"]>
  >(
    (open, eventDetails) => {
      playStateSound(open);
      onOpenChange?.(open, eventDetails);
    },
    [onOpenChange, playStateSound]
  );

  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      onOpenChange={sounds ? handleOpenChange : onOpenChange}
      {...props}
    />
  );
};

const CollapsibleTrigger = ({
  ...props
}: CollapsiblePrimitive.Trigger.Props) => (
  <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
);

const CollapsibleContent = ({ ...props }: CollapsiblePrimitive.Panel.Props) => (
  <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
);

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
