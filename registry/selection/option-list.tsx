"use client";

import { Check } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Option } from "./types";

export type { Option } from "./types";

interface OptionListContextValue {
  hasSelection: boolean;
  isSelected: (index: number) => boolean;
  multiple: boolean;
  onSubmit?: (selected: Option[]) => void;
  options: Option[];
  select: (option: Option, index: number) => void;
  submit: () => void;
}

const OptionListContext = createContext<OptionListContextValue | null>(null);

export const useOptionList = () => {
  const context = useContext(OptionListContext);

  if (!context) {
    throw new Error("OptionList components must be used within OptionList");
  }

  return context;
};

const DEFAULT_OPTIONS: Option[] = [
  { description: "3-5 business days", label: "Standard shipping" },
  { description: "1-2 business days", label: "Express shipping" },
  { description: "Available in 2h", label: "Store pickup" },
];

export interface OptionListProps extends ComponentProps<"div"> {
  actions?: {
    onSubmit?: (selected: Option[]) => void;
  };
  appearance?: {
    multiple?: boolean;
  };
  control?: {
    selectedOptionIndex?: number;
    selectedOptionIndexes?: number[];
  };
  data?: {
    options?: Option[];
  };
}

interface OptionListItemProps extends Omit<
  ComponentProps<"button">,
  "onClick"
> {
  index: number;
  option: Option;
}

const getSelectedIndexes = (
  multiple: boolean,
  control?: OptionListProps["control"]
) => {
  if (multiple) {
    return control?.selectedOptionIndexes ?? [];
  }

  if (control?.selectedOptionIndex === undefined) {
    return [];
  }

  return [control.selectedOptionIndex];
};

export const OptionListItem = ({
  children,
  className,
  index,
  option,
  ...props
}: OptionListItemProps) => {
  const { isSelected, multiple, select } = useOptionList();
  const selected = isSelected(index);

  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm",
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background hover:bg-muted",
        option.disabled && "!cursor-not-allowed opacity-50",
        className
      )}
      disabled={option.disabled}
      onClick={() => select(option, index)}
      type="button"
      {...props}
    >
      {children ?? (
        <>
          {option.icon}
          {option.label && <span>{option.label}</span>}
          {option.description && (
            <span
              className={cn(
                "text-[10px] sm:text-xs",
                selected ? "text-background/70" : "text-muted-foreground"
              )}
            >
              · {option.description}
            </span>
          )}
          {selected && multiple && <Check className="size-3 sm:size-3.5" />}
        </>
      )}
    </button>
  );
};

export const OptionListOptions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { options } = useOptionList();

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children ??
        options.map((option, index) => (
          <OptionListItem
            index={index}
            key={`${option.label ?? "option"}-${index}`}
            option={option}
          />
        ))}
    </div>
  );
};

export const OptionListActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { hasSelection, onSubmit, submit } = useOptionList();

  if (!(children || onSubmit)) {
    return null;
  }

  return (
    <div className={cn("flex justify-end", className)} {...props}>
      {children ?? (
        <Button disabled={!hasSelection} onClick={submit} size="sm">
          Confirm
        </Button>
      )}
    </div>
  );
};

export const OptionListContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) => (
  <div className={cn("space-y-3", className)} {...props}>
    {children}
  </div>
);

const OptionListRoot = ({
  actions,
  appearance,
  children,
  className,
  control,
  data,
  ...props
}: OptionListProps & { children: React.ReactNode }) => {
  const multiple = appearance?.multiple ?? false;
  const options = data?.options ?? DEFAULT_OPTIONS;
  const selectedOptionIndex = control?.selectedOptionIndex;
  const selectedOptionIndexes = control?.selectedOptionIndexes;
  const selectedControl = { selectedOptionIndex, selectedOptionIndexes };
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(getSelectedIndexes(multiple, selectedControl))
  );

  useEffect(() => {
    setSelected(
      new Set(
        getSelectedIndexes(multiple, {
          selectedOptionIndex,
          selectedOptionIndexes,
        })
      )
    );
  }, [multiple, selectedOptionIndex, selectedOptionIndexes]);

  const select = (option: Option, index: number) => {
    if (option.disabled) {
      return;
    }

    setSelected((current) => {
      const next = new Set(multiple ? current : []);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const context: OptionListContextValue = {
    hasSelection: selected.size > 0,
    isSelected: (index) => selected.has(index),
    multiple,
    onSubmit: actions?.onSubmit,
    options,
    select,
    submit: () =>
      actions?.onSubmit?.(options.filter((_, index) => selected.has(index))),
  };

  return (
    <OptionListContext.Provider value={context}>
      <div
        className={cn("w-full rounded-lg bg-card p-4", className)}
        {...props}
      >
        {children}
      </div>
    </OptionListContext.Provider>
  );
};

export const OptionList = OptionListRoot;
