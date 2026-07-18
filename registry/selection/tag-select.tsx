"use client";

import { Check, X } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Tag {
  color?: "default" | "blue" | "green" | "red" | "yellow" | "purple";
  id?: string;
  label?: string;
}

interface TagSelectContextValue {
  clear: () => void;
  isSelected: (tagId: string) => boolean;
  onValidate?: (tagIds: string[]) => void;
  selected: string[];
  showClear: boolean;
  showValidate: boolean;
  tags: Tag[];
  toggle: (tagId: string) => void;
  validateLabel: string;
}

const TagSelectContext = createContext<TagSelectContextValue | null>(null);

export const useTagSelect = () => {
  const context = useContext(TagSelectContext);

  if (!context) {
    throw new Error("TagSelect components must be used within TagSelect");
  }

  return context;
};

const DEFAULT_TAGS: Tag[] = [
  { color: "red", id: "1", label: "Important" },
  { color: "yellow", id: "2", label: "In Progress" },
  { color: "green", id: "3", label: "Done" },
];

export interface TagSelectProps extends ComponentProps<"div"> {
  actions?: {
    onValidate?: (tagIds: string[]) => void;
  };
  appearance?: {
    mode?: "single" | "multiple";
    showClear?: boolean;
    showValidate?: boolean;
    validateLabel?: string;
  };
  control?: {
    selectedTagIds?: string[];
  };
  data?: {
    tags?: Tag[];
  };
}

interface TagSelectItemProps extends Omit<ComponentProps<"button">, "onClick"> {
  tag: Tag;
  tagId: string;
}

export const TagSelectItem = ({
  children,
  className,
  tag,
  tagId,
  ...props
}: TagSelectItemProps) => {
  const { isSelected, toggle } = useTagSelect();
  const selected = isSelected(tagId);

  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs transition-colors sm:gap-1.5 sm:px-3 sm:py-1 sm:text-sm",
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:bg-muted",
        className
      )}
      onClick={() => toggle(tagId)}
      type="button"
      {...props}
    >
      {children ?? (
        <>
          {selected && <Check className="size-3 sm:size-3.5" />}
          {tag.label && <span>{tag.label}</span>}
        </>
      )}
    </button>
  );
};

export const TagSelectTags = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { tags } = useTagSelect();

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children ??
        tags.map((tag, index) => {
          const tagId = tag.id ?? `tag-${index}`;
          return <TagSelectItem key={tagId} tag={tag} tagId={tagId} />;
        })}
    </div>
  );
};

export const TagSelectActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const {
    clear,
    onValidate,
    selected,
    showClear,
    showValidate,
    validateLabel,
  } = useTagSelect();

  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children ?? (
        <>
          {showClear && selected.length > 0 ? (
            <button
              className="inline-flex cursor-pointer items-center gap-1 text-muted-foreground text-xs transition-colors hover:text-foreground"
              onClick={clear}
              type="button"
            >
              <X className="size-3" />
              Clear selection ({selected.length})
            </button>
          ) : (
            <div />
          )}
          {showValidate && (
            <Button
              disabled={selected.length === 0}
              onClick={() => onValidate?.(selected)}
              size="sm"
            >
              {validateLabel}
              {selected.length > 0 && ` (${selected.length})`}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export const TagSelectContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div className={cn("space-y-2", className)} {...props}>
    {children ?? (
      <>
        <TagSelectTags />
        <TagSelectActions />
      </>
    )}
  </div>
);

const TagSelectRoot = ({
  actions,
  appearance,
  children,
  className,
  control,
  data,
  ...props
}: TagSelectProps) => {
  const mode = appearance?.mode ?? "multiple";
  const [selected, setSelected] = useState(control?.selectedTagIds ?? []);

  useEffect(() => {
    setSelected(control?.selectedTagIds ?? []);
  }, [control?.selectedTagIds]);

  const context: TagSelectContextValue = {
    clear: () => setSelected([]),
    isSelected: (tagId) => selected.includes(tagId),
    onValidate: actions?.onValidate,
    selected,
    showClear: appearance?.showClear ?? true,
    showValidate: appearance?.showValidate ?? true,
    tags: data?.tags ?? DEFAULT_TAGS,
    toggle: (tagId) =>
      setSelected((current) => {
        if (current.includes(tagId)) {
          return current.filter((id) => id !== tagId);
        }
        return mode === "single" ? [tagId] : [...current, tagId];
      }),
    validateLabel: appearance?.validateLabel ?? "Validate selection",
  };

  return (
    <TagSelectContext.Provider value={context}>
      <div
        className={cn("w-full rounded-lg bg-card p-4", className)}
        {...props}
      >
        {children ?? <TagSelectContent />}
      </div>
    </TagSelectContext.Provider>
  );
};

export const TagSelect = TagSelectRoot;
