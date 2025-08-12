
import * as React from "react";
import { cn } from "@/src/ui/lib/utils";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
}

const getShineGradient = (shineColor: string | string[]) => {
  const color = Array.isArray(shineColor) ? shineColor.join(",") : shineColor;
  return `radial-gradient(transparent, transparent, ${color}, transparent, transparent)`;
};

const ShineBorder = ({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}: ShineBorderProps) => {
  const dynamicStyle: React.CSSProperties = {
    "--border-width": `${borderWidth}px`,
    "--duration": `${duration}s`,
    backgroundImage: getShineGradient(shineColor),
    backgroundSize: "300% 300%",
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    padding: "var(--border-width)",
    ...style,
  } as React.CSSProperties;

  return (
    <div
      style={dynamicStyle}
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine",
        className
      )}
      {...props}
    />
  );
};

export { ShineBorder };
