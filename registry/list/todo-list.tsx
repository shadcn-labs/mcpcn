"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAdd?: (text: string) => void;
}

export interface TodoListProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAdd?: (text: string) => void;
}

export const TodoList = createCompoundBlock<ActionContext, TodoListProps>({
  buildContext: (props) => ({
    onAdd: props.onAdd,
    onDelete: props.onDelete,
    onToggle: props.onToggle,
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "TodoList",
  renderDefault: () => (
    <div className="space-y-4">
      <TodoList.Item>
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium">Sample Item</span>
          <span className="text-sm text-muted-foreground">Ready</span>
        </div>
      </TodoList.Item>
      <TodoList.AddInput />
      <TodoList.EmptyState>
        <p className="text-sm text-muted-foreground">
          Sample emptystate content that can be fully replaced by children.
        </p>
      </TodoList.EmptyState>
    </div>
  ),
  slots: {
    AddInput: {
      render: ({ className, children }) =>
        children ?? (
          <input className={cn("flex gap-2", className)} placeholder="Add" />
        ),
    },
    EmptyState: {
      className:
        "rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground",
    },
    Item: { className: "rounded-lg border p-3" },
  },
});
