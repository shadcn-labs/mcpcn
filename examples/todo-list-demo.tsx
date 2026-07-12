"use client";

import { TodoList } from "@/registry/list/todo-list";

export default function TodoListDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TodoList />
      <TodoList>
        <TodoList.Item id="types" text="Define factual props" completed />
        <TodoList.Item id="slots" text="Add arbitrary child slots">
          <span className="rounded-full bg-muted px-2 py-1 text-xs">Next</span>
        </TodoList.Item>
        <TodoList.AddInput />
      </TodoList>
    </div>
  );
}
