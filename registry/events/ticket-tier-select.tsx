"use client";

import { Info, Minus, Plus } from "lucide-react";
import { createContext, createElement, useContext, useState } from "react";
import type { ComponentProps, ImgHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

export interface TicketTier {
  available?: number;
  description?: string;
  fee?: number;
  maxPerOrder?: number;
  name?: string;
  price?: number;
  salesEndDate?: string;
}

export interface TicketSelection {
  fee?: number;
  price?: number;
  quantity: number;
  tierName?: string;
}

export interface TicketTierEvent {
  currency?: string;
  date?: string;
  image?: string;
  title?: string;
}

interface TicketTierSelectContextValue {
  checkout: () => void;
  currency: string;
  event?: TicketTierEvent;
  selections: Record<number, number>;
  selectionsList: TicketSelection[];
  showOrderSummary: boolean;
  subtotal: number;
  tiers: TicketTier[];
  total: number;
  totalFees: number;
  updateQuantity: (tierIndex: number, delta: number) => void;
}

const TicketTierSelectContext =
  createContext<TicketTierSelectContextValue | null>(null);

export const useTicketTierSelect = () => {
  const context = useContext(TicketTierSelectContext);
  if (!context) {
    throw new Error(
      "TicketTierSelect components must be used within TicketTierSelect"
    );
  }
  return context;
};

const DEFAULT_TIERS: TicketTier[] = [
  {
    available: 100,
    fee: 5,
    maxPerOrder: 10,
    name: "General Admission",
    price: 45,
  },
  {
    available: 20,
    description: "Includes backstage access",
    fee: 15,
    maxPerOrder: 4,
    name: "VIP",
    price: 150,
  },
];

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    currency,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(amount);

export interface TicketTierSelectProps extends ComponentProps<"div"> {
  actions?: {
    onCheckout?: (selections: TicketSelection[], total: number) => void;
  };
  appearance?: {
    showOrderSummary?: boolean;
  };
  control?: {
    selections?: Record<number, number>;
  };
  data?: {
    event?: TicketTierEvent;
    tiers?: TicketTier[];
  };
}

interface TicketTierItemProps extends ComponentProps<"div"> {
  index: number;
  tier: TicketTier;
}

export const TicketTierItem = ({
  children,
  className,
  index,
  tier,
  ...props
}: TicketTierItemProps) => {
  const { currency, selections, updateQuantity } = useTicketTierSelect();
  const quantity = selections[index] ?? 0;
  const maximum = Math.min(tier.maxPerOrder ?? 10, tier.available ?? 100);
  const totalPrice = (tier.price ?? 0) + (tier.fee ?? 0);

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-colors",
        quantity > 0 && "border-primary ring-1 ring-primary",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex items-center justify-between">
            {tier.name && <h3 className="font-medium">{tier.name}</h3>}
            <div className="flex items-center gap-3">
              <Button
                className={cn(
                  "size-8 rounded-full",
                  quantity === 0 && "opacity-50"
                )}
                disabled={quantity === 0}
                onClick={() => updateQuantity(index, -1)}
                size="icon"
                variant="outline"
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-6 text-center font-medium">{quantity}</span>
              <Button
                className="size-8 rounded-full"
                disabled={quantity >= maximum}
                onClick={() => updateQuantity(index, 1)}
                size="icon"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
          {tier.price !== undefined && (
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold">
                  {formatCurrency(totalPrice, currency)}
                </span>
                {(tier.fee ?? 0) > 0 && (
                  <span className="text-muted-foreground text-sm">
                    incl. {formatCurrency(tier.fee ?? 0, currency)} Fee
                  </span>
                )}
              </div>
              {tier.salesEndDate && (
                <p className="mt-1 text-muted-foreground text-sm">
                  Sales end on {tier.salesEndDate}
                </p>
              )}
            </div>
          )}
          {tier.description && (
            <p className="mt-3 text-muted-foreground text-sm">
              {tier.description}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export const TicketTierOptions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { tiers } = useTicketTierSelect();
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children ??
        tiers.map((tier, index) => (
          <TicketTierItem
            index={index}
            key={`${tier.name ?? "tier"}-${index}`}
            tier={tier}
          />
        ))}
    </div>
  );
};

export const TicketOrderSummary = ({
  children,
  className,
  ...props
}: ComponentProps<"aside">) => {
  const {
    currency,
    event,
    selectionsList,
    showOrderSummary,
    subtotal,
    total,
    totalFees,
  } = useTicketTierSelect();

  if (!showOrderSummary) {
    return null;
  }

  return (
    <aside className={cn("w-full shrink-0 lg:w-80", className)} {...props}>
      {children ?? (
        <>
          {event?.image && (
            <BlockImage
              alt={event.title ?? "Event image"}
              className="mb-4 h-40 w-full rounded-lg object-cover"
              src={event.image}
            />
          )}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="mb-4 font-semibold">Order summary</h3>
            {selectionsList.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No tickets selected
              </p>
            ) : (
              <>
                <div className="space-y-2">
                  {selectionsList.map((selection, index) => (
                    <div
                      className="flex justify-between text-sm"
                      key={`${selection.tierName ?? "ticket"}-${index}`}
                    >
                      <span>
                        {selection.quantity} x {selection.tierName ?? "Ticket"}
                      </span>
                      <span>
                        {formatCurrency(
                          (selection.price ?? 0) * selection.quantity,
                          currency
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      Fees <Info className="size-3 text-muted-foreground" />
                    </span>
                    <span>{formatCurrency(totalFees, currency)}</span>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(total, currency)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </aside>
  );
};

export const TicketTierContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { checkout, event, selectionsList } = useTicketTierSelect();
  return (
    <div
      className={cn("flex flex-col gap-6 lg:flex-row", className)}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex-1">
            {(event?.title || event?.date) && (
              <div className="mb-6 text-center">
                {event.title && (
                  <h2 className="font-semibold text-xl">{event.title}</h2>
                )}
                {event.date && (
                  <p className="mt-1 text-muted-foreground text-sm">
                    {event.date}
                  </p>
                )}
              </div>
            )}
            <TicketTierOptions />
            <div className="mt-6">
              <Button
                className="w-full"
                disabled={selectionsList.length === 0}
                onClick={checkout}
                size="lg"
              >
                Check out
              </Button>
            </div>
          </div>
          <TicketOrderSummary />
        </>
      )}
    </div>
  );
};

const TicketTierSelectRoot = ({
  actions,
  appearance,
  children,
  className,
  control,
  data,
  ...props
}: TicketTierSelectProps) => {
  const tiers = data?.tiers ?? DEFAULT_TIERS;
  const [selections, setSelections] = useState(control?.selections ?? {});
  const selectionsList = Object.entries(selections).flatMap(
    ([key, quantity]) => {
      const tier = tiers[Number.parseInt(key, 10)];
      return tier && quantity > 0
        ? [{ fee: tier.fee, price: tier.price, quantity, tierName: tier.name }]
        : [];
    }
  );
  const subtotal = selectionsList.reduce(
    (sum, selection) => sum + (selection.price ?? 0) * selection.quantity,
    0
  );
  const totalFees = selectionsList.reduce(
    (sum, selection) => sum + (selection.fee ?? 0) * selection.quantity,
    0
  );
  const total = subtotal + totalFees;
  const context: TicketTierSelectContextValue = {
    checkout: () => actions?.onCheckout?.(selectionsList, total),
    currency: data?.event?.currency ?? "USD",
    event: data?.event,
    selections,
    selectionsList,
    showOrderSummary: appearance?.showOrderSummary ?? true,
    subtotal,
    tiers,
    total,
    totalFees,
    updateQuantity: (index, delta) =>
      setSelections((current) => {
        const tier = tiers[index];
        if (!tier) {
          return current;
        }
        const quantity = Math.max(
          0,
          Math.min(
            (current[index] ?? 0) + delta,
            tier.maxPerOrder ?? 10,
            tier.available ?? 100
          )
        );
        if (quantity === 0) {
          const { [index]: _, ...rest } = current;
          return rest;
        }
        return { ...current, [index]: quantity };
      }),
  };

  return (
    <TicketTierSelectContext.Provider value={context}>
      <div
        className={cn("rounded-xl border bg-card p-6", className)}
        {...props}
      >
        {children ?? <TicketTierContent />}
      </div>
    </TicketTierSelectContext.Provider>
  );
};

export const TicketTierSelect = TicketTierSelectRoot;
