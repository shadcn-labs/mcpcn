"use client";

import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { createContext, createElement, useContext } from "react";
import type { ComponentProps, ImgHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

interface OrderConfirmData {
  deliveryAddress?: string;
  deliveryDate?: string;
  freeShipping?: boolean;
  price?: number;
  productImage?: string;
  productName?: string;
  productVariant?: string;
  quantity?: number;
}

interface OrderConfirmContextValue {
  data: OrderConfirmData;
  formatCurrency: (value: number) => string;
  isLoading: boolean;
  onConfirm?: () => void;
}

const OrderConfirmContext = createContext<OrderConfirmContextValue | null>(
  null
);

export const useOrderConfirm = () => {
  const context = useContext(OrderConfirmContext);

  if (!context) {
    throw new Error("OrderConfirm components must be used within OrderConfirm");
  }

  return context;
};

const DEFAULT_ORDER: OrderConfirmData = {
  deliveryDate: "Jan 20, 2024",
  price: 299,
  productImage: "https://mcpcn.dev/demo/shoe-1.png",
  productName: "Air Force 1 '07",
};

export interface OrderConfirmProps extends ComponentProps<"div"> {
  actions?: {
    onConfirm?: () => void;
  };
  appearance?: {
    currency?: string;
  };
  control?: {
    isLoading?: boolean;
  };
  data?: OrderConfirmData;
}

export const OrderConfirmProduct = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data, formatCurrency } = useOrderConfirm();
  const quantity = data.quantity ?? 1;
  const freeShipping = data.freeShipping ?? true;

  return (
    <div
      className={cn("flex items-start gap-3 p-3 sm:gap-4 sm:p-2", className)}
      {...props}
    >
      {children ?? (
        <>
          {data.productImage && (
            <BlockImage
              alt={data.productName ?? "Product image"}
              className="size-12 rounded-sm bg-muted/30 object-contain sm:size-16 sm:rounded-md"
              src={data.productImage}
            />
          )}
          <div className="min-w-0 flex-1">
            {data.productName && (
              <h3 className="truncate font-medium text-sm sm:text-base">
                {data.productName}
              </h3>
            )}
            <p className="text-muted-foreground text-xs sm:text-sm">
              {data.productVariant}
              {data.productVariant ? " • " : ""}
              Qty: {quantity}
            </p>
            <div className="mt-1 sm:hidden">
              {data.price !== undefined && (
                <p className="font-semibold text-sm">
                  {formatCurrency(data.price)}
                </p>
              )}
              {freeShipping && (
                <p className="text-green-600 text-xs">Free shipping</p>
              )}
            </div>
          </div>
          <div className="hidden text-right sm:block">
            {data.price !== undefined && (
              <p className="font-semibold">{formatCurrency(data.price)}</p>
            )}
            {freeShipping && (
              <p className="text-green-600 text-sm">Free shipping</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const OrderConfirmDelivery = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data } = useOrderConfirm();

  return (
    <div
      className={cn(
        "space-y-1.5 text-muted-foreground text-xs sm:flex sm:flex-wrap sm:items-center sm:gap-2 sm:space-y-0 sm:text-sm",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {data.deliveryDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3 shrink-0 sm:size-3.5" />
              <span>{data.deliveryDate}</span>
            </div>
          )}
          {data.deliveryDate && data.deliveryAddress && (
            <span className="hidden sm:inline">•</span>
          )}
          {data.deliveryAddress && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3 shrink-0 sm:size-3.5" />
              <span className="truncate">{data.deliveryAddress}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const OrderConfirmAction = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Button>) => {
  const { isLoading, onConfirm } = useOrderConfirm();

  return (
    <Button
      className={cn("w-full sm:w-auto", className)}
      disabled={isLoading}
      onClick={onConfirm}
      size="sm"
      {...props}
    >
      {children ?? (
        <>
          {isLoading ? "Confirming..." : "Confirm order"}
          <ArrowRight className="ml-1.5 size-3.5 sm:size-4" />
        </>
      )}
    </Button>
  );
};

export const OrderConfirmFooter = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "space-y-3 p-3 sm:flex sm:items-center sm:justify-between sm:space-y-0 sm:py-2 sm:pr-2 sm:pl-4",
      className
    )}
    {...props}
  >
    {children ?? (
      <>
        <OrderConfirmDelivery />
        <OrderConfirmAction />
      </>
    )}
  </div>
);

export const OrderConfirmContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div className={className} {...props}>
    {children ?? (
      <>
        <OrderConfirmProduct />
        <div className="border-t" />
        <OrderConfirmFooter />
      </>
    )}
  </div>
);

const OrderConfirmRoot = ({
  actions,
  appearance,
  children,
  className,
  control,
  data,
  ...props
}: OrderConfirmProps) => {
  const currency = appearance?.currency ?? "USD";
  const context: OrderConfirmContextValue = {
    data: data ?? DEFAULT_ORDER,
    formatCurrency: (value) =>
      new Intl.NumberFormat("en-US", { currency, style: "currency" }).format(
        value
      ),
    isLoading: control?.isLoading ?? false,
    onConfirm: actions?.onConfirm,
  };

  return (
    <OrderConfirmContext.Provider value={context}>
      <div
        className={cn("w-full rounded-md bg-card sm:rounded-lg", className)}
        {...props}
      >
        {children ?? <OrderConfirmContent />}
      </div>
    </OrderConfirmContext.Provider>
  );
};

export const OrderConfirm = OrderConfirmRoot;
