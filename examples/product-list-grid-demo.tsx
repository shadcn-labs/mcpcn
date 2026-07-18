"use client";

import { ProductList, ProductListContent } from "@/registry/list/product-list";

export default function ProductListGridDemo() {
  return (
    <ProductList appearance={{ variant: "grid" }}>
      <ProductListContent />
    </ProductList>
  );
}
