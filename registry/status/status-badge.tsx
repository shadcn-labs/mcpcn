"use client";

import {
  Check,
  Clock,
  AlertCircle,
  XCircle,
  Loader2,
  Truck,
} from "lucide-react";

import { createCompoundComponent } from "@/components/ui/compound";
import { cn } from "@/lib/utils";

import { demoStatusBadge } from "./demo/status";

/**
 * Available status types for the badge.
 * @typedef {"success" | "pending" | "processing" | "warning" | "error" | "shipped" | "delivered" | "cancelled"} StatusType
 */
export type StatusType =
  | "success"
  | "pending"
  | "processing"
  | "warning"
  | "error"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * StatusBadgeProps
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Props for the StatusBadge component.
 * Displays a status indicator with configurable appearance.
 */
export interface StatusBadgeProps {
  data?: {
    /** The status to display (success, pending, processing, warning, error, shipped, delivered, cancelled). */
    status?: StatusType;
  };
  appearance?: {
    /** Custom label text that overrides the default status label. */
    label?: string;
    /**
     * Whether to show the status icon.
     * @default true
     */
    showIcon?: boolean;
    /**
     * Badge size variant.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";
  };
}

const statusConfig: Record<
  StatusType,
  { icon: React.ElementType; className: string; defaultLabel: string }
> = {
  cancelled: {
    className: "bg-muted text-muted-foreground border-border",
    defaultLabel: "Cancelled",
    icon: XCircle,
  },
  delivered: {
    className: "bg-foreground text-background border-foreground",
    defaultLabel: "Delivered",
    icon: Check,
  },
  error: {
    className: "bg-destructive/10 text-destructive border-destructive/20",
    defaultLabel: "Error",
    icon: XCircle,
  },
  pending: {
    className: "bg-muted text-muted-foreground border-border",
    defaultLabel: "Pending",
    icon: Clock,
  },
  processing: {
    className: "bg-muted text-foreground border-border",
    defaultLabel: "Processing",
    icon: Loader2,
  },
  shipped: {
    className: "bg-muted text-foreground border-border",
    defaultLabel: "Shipped",
    icon: Truck,
  },
  success: {
    className: "bg-muted text-foreground border-border",
    defaultLabel: "Success",
    icon: Check,
  },
  warning: {
    className: "bg-muted text-foreground border-border",
    defaultLabel: "Warning",
    icon: AlertCircle,
  },
};

const sizeClasses = {
  lg: "px-3 py-1.5 text-sm gap-2",
  md: "px-2.5 py-1 text-sm gap-1.5",
  sm: "px-2 py-0.5 text-xs gap-1",
};

const iconSizes = {
  lg: "h-4 w-4",
  md: "h-3.5 w-3.5",
  sm: "h-3 w-3",
};

const StatusBadgeView = ({ data, appearance }: StatusBadgeProps) => {
  const resolved: NonNullable<StatusBadgeProps["data"]> =
    data ?? demoStatusBadge;
  const status = resolved?.status ?? "pending";
  const label = appearance?.label;
  const showIcon = appearance?.showIcon ?? true;
  const size = appearance?.size ?? "md";
  const config = statusConfig[status];
  const Icon = config.icon;
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        config.className,
        sizeClasses[size]
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            iconSizes[size],
            status === "processing" && "animate-spin"
          )}
        />
      )}
      {displayLabel}
    </span>
  );
};

export const StatusBadge = createCompoundComponent(
  StatusBadgeView,
  "StatusBadge"
);
