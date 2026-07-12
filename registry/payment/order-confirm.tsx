"use client";

import { ArrowRight, Calendar, MapPin, ShoppingBag } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext, formatPrice } from "../_lib/compound";

interface OrderConfirmContextValue {
  currency: string;
  formatPrice: (value: number) => string;
  isLoading: boolean;
  onConfirm?: () => void;
  orderNumber?: string;
}

const { Provider, useCompoundContext } =
  createCompoundContext<OrderConfirmContextValue>("OrderConfirm");

export interface OrderConfirmProps extends ComponentPropsWithoutRef<"div"> {
  currency?: string;
  isLoading?: boolean;
  onConfirm?: () => void;
  orderNumber?: string;
}

function Header({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { orderNumber } = useCompoundContext();
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 pt-3 sm:px-2 sm:pt-2",
        className
      )}
      {...props}
    >
      <ShoppingBag className="h-5 w-5" />
      <div>
        {children ?? <p className="font-semibold">Review your order</p>}
        {orderNumber ? (
          <p className="text-xs text-muted-foreground">{orderNumber}</p>
        ) : null}
      </div>
    </div>
  );
}

interface ItemRowProps extends ComponentPropsWithoutRef<"div"> {
  image?: string;
  name?: string;
  price?: number;
  quantity?: number;
  sku?: string;
  variant?: string;
}

function ItemRow({
  image,
  name = "Item",
  price = 0,
  quantity = 1,
  sku,
  variant,
  className,
  children,
  ...props
}: ItemRowProps) {
  const { formatPrice: format } = useCompoundContext();
  return (
    <div
      className={cn("flex items-start gap-3 p-3 sm:gap-4 sm:p-2", className)}
      {...props}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-sm bg-muted/30 object-contain sm:h-16 sm:w-16 sm:rounded-md"
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium sm:text-base">{name}</h3>
        <p className="text-xs text-muted-foreground sm:text-sm">
          {[variant, sku, `Qty: ${quantity}`].filter(Boolean).join(" • ")}
        </p>
        {children}
      </div>
      <p className="font-semibold">{format(price * quantity)}</p>
    </div>
  );
}

function PriceBreakdown({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  useCompoundContext();
  return (
    <div
      className={cn("space-y-2 border-t p-3 text-sm sm:p-4", className)}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>Calculated at checkout</span>
          </div>
        </>
      )}
    </div>
  );
}

interface TotalProps extends ComponentPropsWithoutRef<"div"> {
  value?: number;
}

function Total({ value = 149.99, className, children, ...props }: TotalProps) {
  const { formatPrice: format } = useCompoundContext();
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t px-3 py-3 font-semibold sm:px-4",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span>Total</span>
          <span>{format(value)}</span>
        </>
      )}
    </div>
  );
}

interface ActionProps extends ComponentPropsWithoutRef<"div"> {
  deliveryAddress?: string;
  deliveryDate?: string;
}

function Action({
  deliveryAddress,
  deliveryDate,
  className,
  children,
  ...props
}: ActionProps) {
  const { isLoading, onConfirm } = useCompoundContext();
  return (
    <div
      className={cn(
        "space-y-3 border-t p-3 sm:flex sm:items-center sm:justify-between sm:space-y-0 sm:px-4",
        className
      )}
      {...props}
    >
      <div className="space-y-1.5 text-xs text-muted-foreground sm:flex sm:items-center sm:gap-2 sm:space-y-0 sm:text-sm">
        {deliveryDate ? (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{deliveryDate}</span>
          </div>
        ) : null}
        {deliveryDate && deliveryAddress ? (
          <span className="hidden sm:inline">•</span>
        ) : null}
        {deliveryAddress ? (
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{deliveryAddress}</span>
          </div>
        ) : null}
      </div>
      {children ?? (
        <Button
          className="w-full sm:w-auto"
          size="sm"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Confirming…" : "Confirm order"}
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

function OrderConfirmRoot({
  currency = "USD",
  isLoading = false,
  onConfirm,
  orderNumber,
  className,
  children,
  ...props
}: OrderConfirmProps) {
  return (
    <Provider
      value={{
        currency,
        formatPrice: (value) => formatPrice(value, currency),
        isLoading,
        onConfirm,
        orderNumber,
      }}
    >
      <div
        className={cn(
          "w-full overflow-hidden rounded-md border bg-card sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Header />
            <ItemRow
              name="Wireless earbuds"
              variant="White"
              sku="EAR-01"
              quantity={1}
              price={149.99}
            />
            <PriceBreakdown />
            <Total />
            <Action
              deliveryDate="Fri, Jan 20"
              deliveryAddress="123 Main St, New York"
            />
          </>
        )}
      </div>
    </Provider>
  );
}

export const OrderConfirm = Object.assign(OrderConfirmRoot, {
  Action,
  Header,
  ItemRow,
  PriceBreakdown,
  Total,
});
