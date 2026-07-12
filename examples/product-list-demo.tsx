"use client";

import { ProductList } from "@/registry/list/product-list";

export default function ProductListDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ProductList />
      <ProductList>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <ProductList.Content />
        </div>
      </ProductList>
    </div>
  );
}
