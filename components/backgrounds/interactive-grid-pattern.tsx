import React, { useState } from "react";
import { cn } from "@ui/lib/utils";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
}

const InteractiveGridPattern = ({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) => {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  const totalSquares = horizontal * vertical;

  const renderSquare = (index: number) => {
    const x = (index % horizontal) * width;
    const y = Math.floor(index / horizontal) * height;

    return (
      <rect
        key={index}
        x={x}
        y={y}
        width={width}
        height={height}
        className={cn(
          "stroke-gray-400/30 transition-all ease-in-out [&:not(:hover)]:duration-1000 duration-100",
          hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent",
          squaresClassName
        )}
        onMouseEnter={() => setHoveredSquare(index)}
        onMouseLeave={() => setHoveredSquare(null)}
      />
    );
  };

  return (
    <svg
      data-slot="interactive-grid-pattern"
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "absolute inset-0 h-full w-full border border-gray-400/30",
        className
      )}
      {...props}
    >
      {Array.from({ length: totalSquares }, (_, i) => renderSquare(i))}
    </svg>
  );
};

export { InteractiveGridPattern };
