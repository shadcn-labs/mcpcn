"use client";

import { ProductList, ProductListContent } from "@/registry/list/product-list";

export default function ProductListPickerDemo() {
  return (
    <ProductList appearance={{ variant: "picker" }}>
      <ProductListContent />
    </ProductList>
  );
}
