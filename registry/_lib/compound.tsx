"use client";

import { createContext, createElement, useContext } from "react";
import type { ComponentType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface CompoundProviderProps<T> {
  value: T;
  children: ReactNode;
}

export const createCompoundContext = <T,>(name: string) => {
  const Context = createContext<T | null>(null);

  const Provider = ({ value, children }: CompoundProviderProps<T>) =>
    createElement(Context.Provider, { value }, children);

  const useCompoundContext = () => {
    const context = useContext(Context);

    if (!context) {
      throw new Error(`${name} subcomponents must be rendered inside ${name}.`);
    }

    return context;
  };

  return { Provider, useCompoundContext };
};

export type SlotProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export const Slot = ({ className, children, ...props }: SlotProps) => (
  <div className={cn(className)} {...props}>
    {children}
  </div>
);

export const createSlot = (className: string): ComponentType<SlotProps> => {
  const CompoundSlot = ({ className: override, ...props }: SlotProps) => (
    <Slot className={cn(className, override)} {...props} />
  );

  CompoundSlot.displayName = "CompoundSlot";

  return CompoundSlot;
};

export const formatPrice = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    currency,
    style: "currency",
  }).format(value);

export type StepStatus = "completed" | "current" | "pending";

export interface TimelineStep {
  label: string;
  description?: string;
  status?: StepStatus;
}

export const statusClasses = (status: StepStatus = "pending") =>
  cn(
    "flex h-6 w-6 items-center justify-center rounded-full text-xs",
    status === "completed" && "bg-foreground text-background",
    status === "current" && "border-2 border-foreground bg-card",
    status === "pending" && "border border-muted-foreground/40 bg-card"
  );

type SlotRenderer<TContext, TProps extends SlotProps> = (
  props: TProps,
  context: TContext
) => ReactNode;

interface SlotConfig<TContext> {
  className?: string;
  render?: SlotRenderer<TContext, SlotProps>;
}

export interface CompoundBlockConfig<TContext, TRootProps> {
  name: string;
  className: string;
  buildContext: (props: TRootProps) => TContext;
  renderDefault: (context: TContext) => ReactNode;
  slots: Record<string, SlotConfig<TContext>>;
}

export type CompoundBlock<TRootProps> = ComponentType<TRootProps> &
  Record<string, ComponentType<SlotProps>>;

export const createCompoundBlock = <
  TContext,
  TRootProps extends {
    className?: string;
    children?: ReactNode;
  },
>({
  name,
  className,
  buildContext,
  renderDefault,
  slots,
}: CompoundBlockConfig<TContext, TRootProps>): CompoundBlock<TRootProps> => {
  const { Provider, useCompoundContext } =
    createCompoundContext<TContext>(name);

  const Root = ({ className: override, children, ...props }: TRootProps) => {
    const rootProps = props as TRootProps;
    const context = buildContext(rootProps);

    return (
      <Provider value={context}>
        <div className={cn(className, override)}>
          {children ?? renderDefault(context)}
        </div>
      </Provider>
    );
  };

  Root.displayName = name;

  const components = Object.fromEntries(
    Object.entries(slots).map(([slotName, slot]) => {
      const CompoundSlot = ({
        className: override,
        children,
        ...props
      }: SlotProps) => {
        const context = useCompoundContext();

        if (slot.render) {
          return (
            <>
              {slot.render(
                { children, className: override, ...props },
                context
              )}
            </>
          );
        }

        return (
          <div className={cn(slot.className, override)} {...props}>
            {children}
          </div>
        );
      };

      CompoundSlot.displayName = `${name}.${slotName}`;

      return [slotName, CompoundSlot];
    })
  ) as Record<string, ComponentType<SlotProps>>;

  return Object.assign(Root, components) as CompoundBlock<TRootProps>;
};
