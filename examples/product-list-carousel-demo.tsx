"use client";

import { ProductList, ProductListContent } from "@/registry/list/product-list";

export default function ProductListCarouselDemo() {
  return (
    <ProductList appearance={{ variant: "carousel" }}>
      <ProductListContent />
    </ProductList>
  );
}
