"use client";

import { ProductList } from "@/registry/list/product-list";
import { TodoList } from "@/registry/list/todo-list";

export default function ListIntegration() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <TodoList onAdd={() => console.info("mcpcn action")} />
      <ProductList onAddToCart={() => console.info("mcpcn action")} />
    </div>
  );
}
