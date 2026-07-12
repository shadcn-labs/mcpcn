"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface TodoContextValue {
  onAdd?: (text: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}
const { Provider, useCompoundContext } =
  createCompoundContext<TodoContextValue>("TodoList");
export interface TodoListProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onToggle"
> {
  onAdd?: (text: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}

interface ItemProps extends ComponentPropsWithoutRef<"div"> {
  completed?: boolean;
  id?: string;
  text?: string;
}
function Item({
  completed,
  id = "todo",
  text = "Todo item",
  className,
  children,
  ...props
}: ItemProps) {
  const context = useCompoundContext();
  return (
    <div
      className={cn("flex items-center gap-3 rounded-lg border p-3", className)}
      {...props}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => context.onToggle?.(id)}
        aria-label={`Toggle ${text}`}
      />
      <span
        className={cn(
          "min-w-0 flex-1 text-sm",
          completed && "text-muted-foreground line-through"
        )}
      >
        {text}
      </span>
      {children ?? (
        <Button
          size="icon"
          variant="ghost"
          aria-label={`Delete ${text}`}
          onClick={() => context.onDelete?.(id)}
        >
          <Trash2 />
        </Button>
      )}
    </div>
  );
}

function AddInput({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { onAdd } = useCompoundContext();
  const [value, setValue] = useState("");
  const add = () => {
    const text = value.trim();
    if (!text) {
      return;
    }
    onAdd?.(text);
    setValue("");
  };
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {children ?? (
        <>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                add();
              }
            }}
            className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="Add a task"
          />
          <Button onClick={add}>
            <Plus />
            Add
          </Button>
        </>
      )}
    </div>
  );
}
function EmptyState({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  useCompoundContext();
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children ?? "Nothing left to do."}
    </div>
  );
}
function TodoListRoot({
  onAdd,
  onDelete,
  onToggle,
  className,
  children,
  ...props
}: TodoListProps) {
  return (
    <Provider value={{ onAdd, onDelete, onToggle }}>
      <div
        className={cn(
          "w-full space-y-3 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Item id="brief" text="Review the component brief" completed />
            <Item id="demo" text="Build the composed demo" />
            <AddInput />
          </>
        )}
      </div>
    </Provider>
  );
}
export const TodoList = Object.assign(TodoListRoot, {
  AddInput,
  EmptyState,
  Item,
});
