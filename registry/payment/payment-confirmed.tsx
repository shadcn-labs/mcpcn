"use client";

import { Check, ExternalLink } from "lucide-react";
import { createContext, createElement, useContext } from "react";
import type { ComponentProps, ImgHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

interface PaymentConfirmedData {
  deliveryDate?: string;
  orderId?: string;
  price?: number;
  productDescription?: string;
  productImage?: string;
  productName?: string;
}

interface PaymentConfirmedContextValue {
  data: PaymentConfirmedData;
  formatCurrency: (value: number) => string;
  onTrackOrder?: () => void;
  variant: "compressed" | "default";
}

const PaymentConfirmedContext =
  createContext<PaymentConfirmedContextValue | null>(null);

export const usePaymentConfirmed = () => {
  const context = useContext(PaymentConfirmedContext);

  if (!context) {
    throw new Error(
      "PaymentConfirmed components must be used within PaymentConfirmed"
    );
  }

  return context;
};

const DEFAULT_PAYMENT: PaymentConfirmedData = {
  deliveryDate: "Jan 20, 2024",
  price: 299,
  productImage: "https://picsum.photos/seed/payment-product/400/400",
  productName: "Air Force 1 '07",
};

export interface PaymentConfirmedProps extends ComponentProps<"div"> {
  actions?: {
    onTrackOrder?: () => void;
  };
  appearance?: {
    currency?: string;
    variant?: "default" | "compressed";
  };
  data?: PaymentConfirmedData;
}

const PaymentConfirmedIcon = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    data-apps-sdk-status="success-solid"
    className={cn(
      "flex size-8 items-center justify-center rounded-full bg-foreground",
      className
    )}
    {...props}
  >
    <Check className="size-4 text-background" />
  </div>
);

export const PaymentConfirmedImage = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data } = usePaymentConfirmed();

  return (
    <div
      className={cn("overflow-hidden rounded-lg bg-muted", className)}
      {...props}
    >
      {data.productImage ? (
        <BlockImage
          alt={data.productName ?? "Product image"}
          className="size-full object-cover"
          src={data.productImage}
        />
      ) : (
        <div className="size-full bg-muted" />
      )}
    </div>
  );
};

export const PaymentConfirmedHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data } = usePaymentConfirmed();

  return (
    <div
      className={cn(
        "flex items-center gap-2 border-b bg-muted px-4 py-2",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <PaymentConfirmedIcon className="size-6 shrink-0" />
          <span className="font-medium text-sm">Payment confirmed</span>
          {data.orderId && (
            <span className="ml-auto text-muted-foreground text-xs">
              #{data.orderId}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export const PaymentConfirmedSummary = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data, formatCurrency } = usePaymentConfirmed();

  if (!(children || data.price !== undefined || data.deliveryDate)) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between border-y py-3",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {data.price !== undefined && (
            <div>
              <p className="text-muted-foreground text-xs">Total</p>
              <p className="font-semibold text-lg">
                {formatCurrency(data.price)}
              </p>
            </div>
          )}
          {data.deliveryDate && (
            <div className="text-right">
              <p className="text-muted-foreground text-xs">Delivery</p>
              <p className="font-medium text-sm">{data.deliveryDate}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const PaymentConfirmedAction = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Button>) => {
  const { onTrackOrder } = usePaymentConfirmed();

  return (
    <Button
      className={className}
      onClick={onTrackOrder}
      size="sm"
      variant="outline"
      {...props}
    >
      {children ?? (
        <>
          Track order
          <ExternalLink className="ml-1.5 size-3.5" />
        </>
      )}
    </Button>
  );
};

const CompressedPaymentConfirmed = () => {
  const { data, formatCurrency } = usePaymentConfirmed();

  return (
    <>
      <div className="space-y-4 p-4 sm:hidden">
        <div className="flex flex-col items-center gap-2">
          <PaymentConfirmedIcon className="size-10" />
          <p className="font-semibold text-base">Payment confirmed</p>
        </div>
        <div className="flex justify-center">
          <PaymentConfirmedImage className="size-20" />
        </div>
        <div className="space-y-1 text-center">
          {data.productName && (
            <p className="font-medium text-sm">{data.productName}</p>
          )}
          {data.orderId && (
            <p className="text-muted-foreground text-xs">
              Order #{data.orderId}
            </p>
          )}
        </div>
        <PaymentConfirmedSummary />
        <PaymentConfirmedAction className="w-full" />
      </div>
      <div className="hidden items-center gap-3 p-3 sm:flex">
        <PaymentConfirmedIcon className="size-9 shrink-0" />
        <PaymentConfirmedImage className="size-9 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {data.productName && (
              <span className="truncate font-medium text-sm">
                {data.productName}
              </span>
            )}
            {data.orderId && (
              <span className="text-muted-foreground text-xs">
                #{data.orderId}
              </span>
            )}
          </div>
          {data.deliveryDate && (
            <span className="text-muted-foreground text-xs">
              Delivery: {data.deliveryDate}
            </span>
          )}
        </div>
        {data.price !== undefined && (
          <p className="shrink-0 font-semibold">{formatCurrency(data.price)}</p>
        )}
        <PaymentConfirmedAction className="shrink-0">
          Track
          <ExternalLink className="ml-1 size-3" />
        </PaymentConfirmedAction>
      </div>
    </>
  );
};

const DefaultPaymentConfirmed = () => {
  const { data, formatCurrency } = usePaymentConfirmed();

  return (
    <>
      <div className="sm:hidden">
        <PaymentConfirmedHeader className="flex-col gap-1 px-3 py-3">
          <PaymentConfirmedIcon />
          <span className="font-medium text-sm">Payment confirmed</span>
          {data.orderId && (
            <span className="text-muted-foreground text-xs">
              #{data.orderId}
            </span>
          )}
        </PaymentConfirmedHeader>
        <div className="space-y-4 p-4">
          {data.productImage && (
            <div className="flex justify-center">
              <PaymentConfirmedImage className="size-20" />
            </div>
          )}
          <div className="space-y-1 text-center">
            {data.productName && (
              <p className="font-medium text-base">{data.productName}</p>
            )}
            {data.productDescription && (
              <p className="text-muted-foreground text-sm">
                {data.productDescription}
              </p>
            )}
          </div>
          <PaymentConfirmedSummary />
          <PaymentConfirmedAction className="w-full" />
        </div>
      </div>
      <div className="hidden sm:block">
        <PaymentConfirmedHeader />
        <div className="p-4">
          <div className="flex gap-4">
            <PaymentConfirmedImage className="size-20 shrink-0" />
            <div className="min-w-0 flex-1">
              {data.productName && (
                <p className="truncate font-medium text-base">
                  {data.productName}
                </p>
              )}
              {data.productDescription && (
                <p className="text-muted-foreground text-sm">
                  {data.productDescription}
                </p>
              )}
              <div className="mt-2 flex items-center justify-between">
                {data.price !== undefined && (
                  <span className="font-semibold text-lg">
                    {formatCurrency(data.price)}
                  </span>
                )}
                {data.deliveryDate && (
                  <span className="text-muted-foreground text-sm">
                    Delivery: {data.deliveryDate}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            className="mt-4 flex justify-end border-t pt-4"
            data-apps-sdk-actions=""
          >
            <PaymentConfirmedAction />
          </div>
        </div>
      </div>
    </>
  );
};

export const PaymentConfirmedContent = () => {
  const { variant } = usePaymentConfirmed();
  return variant === "compressed" ? (
    <CompressedPaymentConfirmed />
  ) : (
    <DefaultPaymentConfirmed />
  );
};

const PaymentConfirmedRoot = ({
  actions,
  appearance,
  children,
  className,
  data,
  ...props
}: PaymentConfirmedProps & { children: React.ReactNode }) => {
  const currency = appearance?.currency ?? "EUR";
  const context: PaymentConfirmedContextValue = {
    data: data ?? DEFAULT_PAYMENT,
    formatCurrency: (value) =>
      new Intl.NumberFormat("en-US", { currency, style: "currency" }).format(
        value
      ),
    onTrackOrder: actions?.onTrackOrder,
    variant: appearance?.variant ?? "default",
  };

  return (
    <PaymentConfirmedContext.Provider value={context}>
      <div
        data-apps-sdk-surface="card"
        className={cn(
          "w-full overflow-hidden rounded-lg border bg-card",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </PaymentConfirmedContext.Provider>
  );
};

export const PaymentConfirmed = PaymentConfirmedRoot;
