"use client";

import { Minus, Plus } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ChangeEvent, ComponentProps, KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AmountInputContextValue {
  amount: number;
  currencySymbol: string;
  editing: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  label: string;
  max: number;
  min: number;
  onConfirm?: (value: number) => void;
  presets: number[];
  setAmount: (value: number) => void;
  setEditing: (editing: boolean) => void;
  step: number;
}

const AmountInputContext = createContext<AmountInputContextValue | null>(null);

export const useAmountInput = () => {
  const context = useContext(AmountInputContext);

  if (!context) {
    throw new Error("AmountInput components must be used within AmountInput");
  }

  return context;
};

const DEFAULT_PRESETS = [10, 25, 50, 100];

export interface AmountInputProps extends ComponentProps<"div"> {
  actions?: {
    onConfirm?: (value: number) => void;
  };
  appearance?: {
    currency?: string;
    label?: string;
    max?: number;
    min?: number;
    step?: number;
  };
  control?: {
    value?: number;
  };
  data?: {
    presets?: number[];
  };
}

export const AmountInputDisplay = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const {
    amount,
    currencySymbol,
    editing,
    inputRef,
    label,
    max,
    min,
    setAmount,
    setEditing,
    step,
  } = useAmountInput();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(
      event.target.value.replaceAll(/[^0-9]/g, ""),
      10
    );
    if (!Number.isNaN(value)) {
      setAmount(value);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="text-muted-foreground text-xs sm:text-sm">
            {label}
          </span>
          <div className="flex items-center justify-center gap-2">
            <button
              className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              disabled={amount <= min}
              onClick={() => setAmount(amount - step)}
              type="button"
            >
              <Minus className="size-4" />
            </button>
            <div className="min-w-24 text-center sm:min-w-28">
              {editing ? (
                <div className="flex items-center justify-center gap-1">
                  <span className="font-bold text-muted-foreground text-xl sm:text-2xl">
                    {currencySymbol}
                  </span>
                  <input
                    ref={inputRef}
                    className="w-16 border-foreground border-b-2 bg-transparent text-center font-bold text-xl outline-none sm:w-20 sm:text-2xl"
                    onBlur={() => setEditing(false)}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    type="text"
                    value={amount}
                  />
                </div>
              ) : (
                <button
                  className="cursor-pointer font-bold text-xl transition-colors hover:text-primary sm:text-2xl"
                  onClick={() => setEditing(true)}
                  type="button"
                >
                  {currencySymbol}
                  {amount}
                </button>
              )}
            </div>
            <button
              className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              disabled={amount >= max}
              onClick={() => setAmount(amount + step)}
              type="button"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export const AmountInputPresets = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { amount, currencySymbol, presets, setAmount } = useAmountInput();

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-2 sm:justify-start",
        className
      )}
      {...props}
    >
      {children ??
        presets.map((preset) => (
          <button
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors sm:text-sm",
              amount === preset
                ? "border-foreground ring-1 ring-foreground"
                : "border-border hover:bg-muted"
            )}
            key={preset}
            onClick={() => setAmount(preset)}
            type="button"
          >
            {currencySymbol}
            {preset}
          </button>
        ))}
    </div>
  );
};

export const AmountInputActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { amount, onConfirm } = useAmountInput();

  if (!(children || onConfirm)) {
    return null;
  }

  return (
    <div className={className} {...props}>
      {children ?? (
        <Button
          className="w-full sm:w-auto"
          onClick={() => onConfirm?.(amount)}
          size="sm"
        >
          Confirm
        </Button>
      )}
    </div>
  );
};

export const AmountInputControls = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) => (
  <div
    className={cn(
      "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const AmountInputRoot = ({
  actions,
  appearance,
  children,
  className,
  control,
  data,
  ...props
}: AmountInputProps & { children: React.ReactNode }) => {
  const currency = appearance?.currency ?? "EUR";
  const max = appearance?.max ?? 10_000;
  const min = appearance?.min ?? 0;
  const [amount, setAmountState] = useState(control?.value ?? 0);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAmountState(control?.value ?? 0);
  }, [control?.value]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const currencySymbol = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        currency,
        minimumFractionDigits: 0,
        style: "currency",
      })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value ?? currency,
    [currency]
  );

  const setAmount = (value: number) => {
    setAmountState(Math.max(min, Math.min(max, value)));
  };

  const context: AmountInputContextValue = {
    amount,
    currencySymbol,
    editing,
    inputRef,
    label: appearance?.label ?? "Amount",
    max,
    min,
    onConfirm: actions?.onConfirm,
    presets: data?.presets ?? DEFAULT_PRESETS,
    setAmount,
    setEditing,
    step: appearance?.step ?? 10,
  };

  return (
    <AmountInputContext.Provider value={context}>
      <div
        className={cn(
          "w-full space-y-3 rounded-md bg-card p-3 sm:rounded-lg sm:p-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AmountInputContext.Provider>
  );
};

export const AmountInput = AmountInputRoot;
