import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[popup-open]:bg-accent/50 data-[popup-open]:text-accent-foreground data-[popup-open]:hover:bg-accent data-[popup-open]:focus:bg-accent"
);

const NavigationMenu = ({
  className,
  ...props
}: NavigationMenuPrimitive.Root.Props) => (
  <NavigationMenuPrimitive.Root
    data-slot="navigation-menu"
    className={cn(
      "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  />
);

const NavigationMenuPortal = NavigationMenuPrimitive.Portal;

const NavigationMenuBackdrop = ({
  className,
  ...props
}: NavigationMenuPrimitive.Backdrop.Props) => (
  <NavigationMenuPrimitive.Backdrop
    data-slot="navigation-menu-backdrop"
    className={cn("fixed inset-0 z-40 bg-background/60", className)}
    {...props}
  />
);

const NavigationMenuPositioner = ({
  className,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) => (
  <NavigationMenuPrimitive.Positioner
    data-slot="navigation-menu-positioner"
    className={cn(
      "isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
      className
    )}
    {...props}
  />
);

const NavigationMenuPopup = ({
  className,
  ...props
}: Omit<NavigationMenuPrimitive.Popup.Props, "children">) => (
  <NavigationMenuPrimitive.Popup
    data-slot="navigation-menu-popup"
    className={cn(
      "relative h-(--popup-height) w-(--popup-width) origin-top overflow-hidden rounded-md border bg-popover text-popover-foreground shadow duration-200",
      "data-[starting-style]:animate-in data-[starting-style]:fade-in-0 data-[starting-style]:slide-in-from-top-2",
      className
    )}
    {...props}
  >
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      className="relative size-full overflow-hidden"
    />
  </NavigationMenuPrimitive.Popup>
);

const NavigationMenuList = ({
  className,
  ...props
}: NavigationMenuPrimitive.List.Props) => (
  <NavigationMenuPrimitive.List
    data-slot="navigation-menu-list"
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-1",
      className
    )}
    {...props}
  />
);

const NavigationMenuItem = ({
  className,
  ...props
}: NavigationMenuPrimitive.Item.Props) => (
  <NavigationMenuPrimitive.Item
    data-slot="navigation-menu-item"
    className={cn("relative", className)}
    {...props}
  />
);

const NavigationMenuTrigger = ({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) => (
  <NavigationMenuPrimitive.Trigger
    data-slot="navigation-menu-trigger"
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDownIcon
      className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[popup-open]:rotate-180"
      strokeWidth={2.5}
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
);

const NavigationMenuContent = ({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props) => (
  <NavigationMenuPrimitive.Content
    data-slot="navigation-menu-content"
    className={cn(
      "h-full w-auto p-2",
      "data-[starting-style]:animate-in data-[starting-style]:fade-in",
      "data-[ending-style]:animate-out data-[ending-style]:fade-out",
      "data-[starting-style]:data-[activation-direction=left]:slide-in-from-left-52",
      "data-[starting-style]:data-[activation-direction=right]:slide-in-from-right-52",
      "data-[ending-style]:data-[activation-direction=left]:slide-out-to-left-52",
      "data-[ending-style]:data-[activation-direction=right]:slide-out-to-right-52",
      "**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
      className
    )}
    {...props}
  />
);

const NavigationMenuLink = ({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props) => (
  <NavigationMenuPrimitive.Link
    data-slot="navigation-menu-link"
    className={cn(
      "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active]:bg-accent/50 data-[active]:text-accent-foreground data-[active]:hover:bg-accent data-[active]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  />
);

export {
  NavigationMenu,
  NavigationMenuBackdrop,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
