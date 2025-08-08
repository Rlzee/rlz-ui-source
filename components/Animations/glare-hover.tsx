import React, { useRef, useCallback } from "react";
import { cn } from "@/src/ui/lib/utils";

interface GlareHoverProps {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const hexToRgba = (hex: string, opacity: number): string => {
  const cleanHex = hex.replace("#", "");
  let r = 0,
    g = 0,
    b = 0;

  if (/^[\da-f]{6}$/i.test(cleanHex)) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else if (/^[\da-f]{3}$/i.test(cleanHex)) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else {
    return hex;
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const GlareHover = ({
  width = "500px",
  height = "500px",
  background = "#000",
  borderRadius = "10px",
  borderColor = "#333",
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style = {},
}: GlareHoverProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rgba = hexToRgba(glareColor, glareOpacity);

  const animateIn = useCallback(() => {
    const el = overlayRef.current;
    if (!el) return;

    el.style.transition = "none";
    el.style.backgroundPosition = "-100% -100%, 0 0";

    void el.offsetWidth;

    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = "100% 100%, 0 0";
  }, [transitionDuration]);

  const animateOut = useCallback(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (playOnce) {
      el.style.transition = "none";
      el.style.backgroundPosition = "-100% -100%, 0 0";
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = "-100% -100%, 0 0";
    }
  }, [playOnce, transitionDuration]);

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
      hsla(0,0%,0%,0) 60%,
      ${rgba} 70%,
      hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none",
  };

  const containerStyle: React.CSSProperties = {
    width,
    height,
    background,
    borderRadius,
    borderColor,
    ...style,
  };

  return (
    <div
      data-slot="glare-hover"
      className={cn(
        "relative grid place-items-center overflow-hidden border cursor-pointer",
        className
      )}
      style={containerStyle}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div data-slot="glare-overlay" ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
};

export { GlareHover };
