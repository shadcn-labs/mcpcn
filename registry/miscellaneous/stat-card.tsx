"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { createContext, useContext } from "react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface StatCard {
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  label?: string;
  trend?: "up" | "down" | "neutral";
  value?: number | string;
}

interface StatCardContextValue {
  stats: StatCard[];
}

const StatCardContext = createContext<StatCardContextValue | null>(null);

export const useStatCard = () => {
  const context = useContext(StatCardContext);

  if (!context) {
    throw new Error("StatCard components must be used within StatCard");
  }

  return context;
};

const DEFAULT_STATS: StatCard[] = [
  { change: 12.5, label: "Revenue", value: "$12,345" },
  { change: -3.2, label: "Orders", value: "1,234" },
  { change: 8.1, label: "Customers", value: "567" },
];

export interface StatCardProps extends ComponentProps<"div"> {
  data?: {
    stats?: StatCard[];
  };
}

interface StatCardItemProps extends ComponentProps<"div"> {
  stat: StatCard;
}

const TREND_CLASSES = {
  down: "text-red-600",
  neutral: "text-muted-foreground",
  up: "text-green-600",
};

const TrendIcon = ({ trend = "neutral" }: Pick<StatCard, "trend">) => {
  if (trend === "up") {
    return <TrendingUp className="size-3.5" />;
  }

  if (trend === "down") {
    return <TrendingDown className="size-3.5" />;
  }

  return <Minus className="size-3.5" />;
};

export const StatCardItem = ({
  children,
  className,
  stat,
  ...props
}: StatCardItemProps) => {
  const trend = stat.trend ?? "neutral";

  return (
    <div
      className={cn(
        "space-y-0.5 rounded-md border bg-card p-2 sm:space-y-1 sm:rounded-lg sm:p-3",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {(stat.label || stat.icon) && (
            <div className="flex items-center justify-between">
              {stat.label && (
                <span className="text-[10px] text-muted-foreground sm:text-xs">
                  {stat.label}
                </span>
              )}
              {stat.icon}
            </div>
          )}
          {(stat.value !== undefined || stat.change !== undefined) && (
            <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
              {stat.value !== undefined && (
                <span className="font-bold text-base sm:text-xl">
                  {stat.value}
                </span>
              )}
              {stat.change !== undefined && (
                <span
                  className={cn(
                    "flex shrink-0 items-center gap-0.5 font-medium text-[10px] sm:text-xs",
                    TREND_CLASSES[trend]
                  )}
                >
                  <TrendIcon trend={trend} />
                  {Math.abs(stat.change)}%
                </span>
              )}
            </div>
          )}
          {stat.changeLabel && (
            <span className="text-[10px] text-muted-foreground sm:text-xs">
              {stat.changeLabel}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export const StatCardList = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { stats } = useStatCard();

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4",
        className
      )}
      {...props}
    >
      {children ??
        stats.map((stat, index) => (
          <StatCardItem key={`${stat.label ?? "stat"}-${index}`} stat={stat} />
        ))}
    </div>
  );
};

const StatCardRoot = ({
  children,
  className,
  data,
  ...props
}: StatCardProps) => {
  const context: StatCardContextValue = {
    stats: data?.stats ?? DEFAULT_STATS,
  };

  return (
    <StatCardContext.Provider value={context}>
      <div className={cn("w-full", className)} {...props}>
        {children ?? <StatCardList />}
      </div>
    </StatCardContext.Provider>
  );
};

export const StatCard = StatCardRoot;
