import React, { useRef, useState } from "react";
import { cn } from "@/src/ui/lib/utils";
import { motion } from "framer-motion";

/* ------------------------------ Spotlight ------------------------------ */

type SpotlightProps = {
  className?: string;
  fill?: string;
};

const spotlightAnimation = `
  @keyframes spotlight {
    0% {
      opacity: 0;
      transform: translate(-72%, -62%) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -40%) scale(1);
    }
  }

  .animate-spotlight {
    animation: spotlight 2s ease 0.75s 1 forwards;
  }
`;

const Spotlight = ({ className, fill = "white" }: SpotlightProps) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: spotlightAnimation }} />

    <svg
      data-slot="spotlight"
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          />
        </filter>
      </defs>
    </svg>
  </>
);

/* --------------------------- Multi Spotlight --------------------------- */

type MultiSpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

const defaultGradients = {
  gradientFirst:
    "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond:
    "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird:
    "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
};

const MultiSpotlight = ({
  gradientFirst = defaultGradients.gradientFirst,
  gradientSecond = defaultGradients.gradientSecond,
  gradientThird = defaultGradients.gradientThird,
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: MultiSpotlightProps = {}) => {
  const renderSpotlightGroup = (direction: "left" | "right", sign: 1 | -1) => (
    <motion.div
      data-slot="multi-spotlight-group"
      animate={{ x: [0, sign * xOffset, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={`absolute top-0 ${direction}-0 w-screen h-screen z-40 pointer-events-none`}
    >
      <div
        style={{
          transform: `translateY(${translateY}px) rotate(${sign * 45}deg)`,
          background: gradientFirst,
          width,
          height,
        }}
        className={cn(
          "absolute top-0",
          direction === "left" ? "left-0" : "right-0"
        )}
      />

      <div
        style={{
          transform: `rotate(${sign * 45}deg) translate(${sign * 5}%, -50%)`,
          background: gradientSecond,
          width: smallWidth,
          height,
        }}
        className={`absolute top-0 ${direction}-0 origin-top-${direction}`}
      />

      <div
        style={{
          transform: `rotate(${sign * 45}deg) translate(${sign * 180}%, -70%)`,
          background: gradientThird,
          width: smallWidth,
          height,
        }}
        className={`absolute top-0 ${direction}-0 origin-top-${direction}`}
      />
    </motion.div>
  );

  return (
    <motion.div
      data-slot="multi-spotlight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {renderSpotlightGroup("left", 1)}
      {renderSpotlightGroup("right", -1)}
    </motion.div>
  );
};

/* --------------------------- Spotlight Card --------------------------- */

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      data-slot="spotlight-card"
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-3xl border border-border bg-background-secondary overflow-hidden p-8",
        className
      )}
      tabIndex={0} // Make it focusable
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        data-slot="spotlight-card-overlay"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

/* ------------------------------ Exports ------------------------------ */

export { Spotlight, MultiSpotlight, SpotlightCard };
