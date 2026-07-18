"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Label = ({
  className,
  htmlFor,
  ...props
}: React.ComponentProps<"label">) => (
  <label
    data-slot="label"
    htmlFor={htmlFor}
    className={cn(
      "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
);

export { Label };
