"use client";

import { TodoList } from "@/registry/list/todo-list";

export default function TodoListDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TodoList />
      <TodoList>
        <TodoList.Header>
          <div>
            <p className="font-semibold">Custom Todo List</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </TodoList.Header>
        <TodoList.AddInput>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </TodoList.AddInput>
      </TodoList>
    </div>
  );
}
