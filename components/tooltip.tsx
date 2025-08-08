"use client";

import { cn } from "@/src/ui/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { de } from "date-fns/locale";
import {
  ComponentProps,
  ReactNode,
  cloneElement,
  isValidElement,
  useId,
  ReactElement,
} from "react";

/* ----------------------------- Root Tooltip ----------------------------- */

const TooltipRoot = (props: ComponentProps<typeof HoverCardPrimitive.Root>) => {
  return (
    <HoverCardPrimitive.Root
      data-slot="tooltip"
      openDelay={500}
      closeDelay={100}
      {...props}
    />
  );
};

/* --------------------------- Tooltip Trigger --------------------------- */

const TooltipTrigger = ({
  children,
  ...props
}: ComponentProps<typeof HoverCardPrimitive.Trigger>) => {
  return (
    <HoverCardPrimitive.Trigger data-slot="tooltip-trigger" asChild {...props}>
      {children}
    </HoverCardPrimitive.Trigger>
  );
};

/* ----------------------------- Tooltip Portal ----------------------------- */

const TooltipPortal = (
  props: ComponentProps<typeof HoverCardPrimitive.Portal>
) => {
  return <HoverCardPrimitive.Portal data-slot="tooltip-portal" {...props} />;
};

/* --------------------------- Tooltip Content --------------------------- */

interface TooltipContentProps
  extends ComponentProps<typeof HoverCardPrimitive.Content> {
  id?: string;
}

const TooltipContent = ({
  className,
  sideOffset = 6,
  id,
  ...props
}: TooltipContentProps) => {
  const fallbackId = useId();
  const tooltipId = id || fallbackId;

  return (
    <TooltipPortal>
      <HoverCardPrimitive.Content
        data-slot="tooltip-content"
        id={tooltipId}
        role="tooltip"
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-sm rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      />
    </TooltipPortal>
  );
};

/* ----------------------------- Tooltip ----------------------------- */

interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  className?: string;
  side?: ComponentProps<typeof TooltipContent>["side"];
  delayDuration?: number;
}

const Tooltip = ({
  content,
  children,
  className,
  side,
  delayDuration,
}: TooltipProps) => {
  const id = useId();

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": id,
      })
    : children;

  return (
    <TooltipRoot openDelay={0} closeDelay={delayDuration || 500}>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent id={id} className={className} side={side}>
        {content}
      </TooltipContent>
    </TooltipRoot>
  );
};

/* ------------------------------ Exports ------------------------------ */

const TooltipComposant = Object.assign(Tooltip, {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Content: TooltipContent,
});

export {
  TooltipComposant as Tooltip,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
};
