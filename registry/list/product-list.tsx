"use client";

import { ShoppingCart, Star } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext, formatPrice } from "../_lib/compound";

interface ProductContextValue {
  formatPrice: (value: number) => string;
  onAddToCart?: (id: string) => void;
  onFilter?: (filter: string) => void;
  onSort?: (sort: string) => void;
}
const { Provider, useCompoundContext } =
  createCompoundContext<ProductContextValue>("ProductList");
export interface ProductListProps extends ComponentPropsWithoutRef<"div"> {
  currency?: string;
  onAddToCart?: (id: string) => void;
  onFilter?: (filter: string) => void;
  onSort?: (sort: string) => void;
}

interface ProductCardProps extends ComponentPropsWithoutRef<"article"> {
  id?: string;
  image?: string;
  name?: string;
  price?: number;
  rating?: number;
}
function ProductCard({
  id = "product",
  image,
  name = "Product",
  price = 0,
  rating = 5,
  className,
  children,
  ...props
}: ProductCardProps) {
  const context = useCompoundContext();
  return (
    <article
      className={cn("overflow-hidden rounded-lg border", className)}
      {...props}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div className="aspect-square bg-muted" />
      )}
      <div className="space-y-2 p-3">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold">{context.formatPrice(price)}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            {rating}
          </span>
        </div>
        {children ?? (
          <Button
            className="w-full"
            size="sm"
            onClick={() => context.onAddToCart?.(id)}
          >
            <ShoppingCart />
            Add to cart
          </Button>
        )}
      </div>
    </article>
  );
}
function FilterBar({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { onFilter } = useCompoundContext();
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children ??
        ["All", "New", "Popular"].map((filter) => (
          <Button
            key={filter}
            size="sm"
            variant="outline"
            onClick={() => onFilter?.(filter.toLowerCase())}
          >
            {filter}
          </Button>
        ))}
    </div>
  );
}
function SortDropdown({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  const { onSort } = useCompoundContext();
  return (
    <select
      className={cn(
        "rounded-md border bg-background px-3 py-2 text-sm",
        className
      )}
      onChange={(event) => onSort?.(event.target.value)}
      {...props}
    >
      {children ?? (
        <>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="rating">Highest rated</option>
        </>
      )}
    </select>
  );
}
function ProductListRoot({
  currency = "USD",
  onAddToCart,
  onFilter,
  onSort,
  className,
  children,
  ...props
}: ProductListProps) {
  return (
    <Provider
      value={{
        formatPrice: (value) => formatPrice(value, currency),
        onAddToCart,
        onFilter,
        onSort,
      }}
    >
      <div
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <div className="flex items-center justify-between gap-3">
              <FilterBar />
              <SortDropdown />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ProductCard
                id="headphones"
                name="Studio headphones"
                price={149}
                rating={4.8}
              />
              <ProductCard
                id="speaker"
                name="Portable speaker"
                price={89}
                rating={4.6}
              />
            </div>
          </>
        )}
      </div>
    </Provider>
  );
}
export const ProductList = Object.assign(ProductListRoot, {
  FilterBar,
  ProductCard,
  SortDropdown,
});
