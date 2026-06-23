"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundBlock, formatPrice } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  currency?: string;
  onFilter?: (filter: string) => void;
  onSort?: (sort: string) => void;
  onAddToCart?: (id: string) => void;
  formatPrice: (value: number) => string;
}

export interface ProductListProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  currency?: string;
  onFilter?: (filter: string) => void;
  onSort?: (sort: string) => void;
  onAddToCart?: (id: string) => void;
}

export const ProductList = createCompoundBlock<ActionContext, ProductListProps>(
  {
    buildContext: (props) => ({
      currency: props.currency ?? "USD",
      formatPrice: (value: number) =>
        formatPrice(value, props.currency ?? "USD"),
      onAddToCart: props.onAddToCart,
      onFilter: props.onFilter,
      onSort: props.onSort,
    }),
    className: "w-full rounded-xl border bg-card p-4 sm:p-6",
    name: "ProductList",
    renderDefault: () => (
      <div className="space-y-4">
        <ProductList.ProductCard>
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium">Sample ProductCard</span>
            <span className="text-sm text-muted-foreground">Ready</span>
          </div>
        </ProductList.ProductCard>
        <ProductList.FilterBar>
          <p className="text-sm text-muted-foreground">
            Sample filterbar content that can be fully replaced by children.
          </p>
        </ProductList.FilterBar>
        <ProductList.SortDropdown />
      </div>
    ),
    slots: {
      FilterBar: { className: "flex flex-wrap gap-2" },
      ProductCard: { className: "rounded-lg border p-3" },
      SortDropdown: {
        render: ({ className, children }) =>
          children ?? (
            <input
              className={cn(
                "rounded-md border bg-background px-3 py-2 text-sm",
                className
              )}
              placeholder="SortDropdown"
            />
          ),
      },
    },
  }
);
