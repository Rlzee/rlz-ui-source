import React from "react";
import { cn } from "@/src/ui/lib/utils";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties["animationDuration"];
    thickness?: number;
  };

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  const starAnimationStyles = `
    @keyframes star-movement-bottom {
      0% { transform: translate(0%, 0%); opacity: 1; }
      100% { transform: translate(-100%, 0%); opacity: 0; }
    }
    @keyframes star-movement-top {
      0% { transform: translate(0%, 0%); opacity: 1; }
      100% { transform: translate(100%, 0%); opacity: 0; }
    }
  `;

  return (
    <>
      <style>{starAnimationStyles}</style>
      <Component
        data-slot="star-border"
        className={cn(
          "relative inline-block overflow-hidden rounded-[20px]",
          className
        )}
        {...(rest as any)}
        style={{
          padding: `${thickness}px 0`,
          ...(rest as any).style,
        }}
      >
        <div
          data-slot="star-border-background"
          className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full z-0"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animation: `star-movement-bottom ${speed} linear infinite alternate`,
          }}
        ></div>
        <div
          data-slot="star-border-background-top"
          className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full z-0"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animation: `star-movement-top ${speed} linear infinite alternate`,
          }}
        ></div>
        <div
          data-slot="star-border-content"
          className="relative z-1 bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]"
        >
          {children}
        </div>
      </Component>
    </>
  );
};
export { StarBorder };
