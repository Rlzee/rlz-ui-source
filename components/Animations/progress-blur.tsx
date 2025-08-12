
import { cn } from "@/src/ui/lib/utils";
import React from "react";

interface ProgressiveBlurProps {
  className?: string;
  height?: string;
  position?: "top" | "bottom" | "both";
  blurLevels?: number[];
  children?: React.ReactNode;
}

const getMaskGradient = (
  position: string,
  start: number,
  mid: number,
  end: number
) => {
  const direction =
    position === "bottom" ? "to bottom" : position === "top" ? "to top" : "";

  if (direction) {
    return `linear-gradient(${direction}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${
      end + 12.5
    }%)`;
  }

  return `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`;
};

const getSingleMaskGradient = (
  position: string,
  start: number,
  end: number
) => {
  const direction =
    position === "bottom" ? "to bottom" : position === "top" ? "to top" : "";

  if (direction) {
    return `linear-gradient(${direction}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${end}%)`;
  }

  return `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`;
};

const ProgressiveBlur = ({
  className,
  height = "30%",
  position = "bottom",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64],
}: ProgressiveBlurProps) => {
  const divElements = Array(blurLevels.length - 2).fill(null);

  const baseStyle = (blur: number, maskImage: string, zIndex: number) => ({
    zIndex,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    maskImage,
    WebkitMaskImage: maskImage,
  });

  return (
    <div
      data-slot="progressive-blur"
      className={cn(
        "gradient-blur pointer-events-none absolute z-10 inset-x-0",
        className,
        position === "top"
          ? "top-0"
          : position === "bottom"
          ? "bottom-0"
          : "inset-y-0"
      )}
      style={{
        height: position === "both" ? "100%" : height,
      }}
    >
      {/* First blur layer */}
      <div
        data-slot="progressive-blur-first"
        className="absolute inset-0"
        style={baseStyle(
          blurLevels[0],
          getMaskGradient(position, 0, 12.5, 25),
          1
        )}
      />

      {/* Middle blur layers */}
      {divElements.map((_, index) => {
        const blurIndex = index + 1;
        const start = blurIndex * 12.5;
        const mid = (blurIndex + 1) * 12.5;
        const end = (blurIndex + 2) * 12.5;

        return (
          <div
            key={`blur-${index}`}
            data-slot={`progressive-blur-${index}`}
            className="absolute inset-0"
            style={baseStyle(
              blurLevels[blurIndex],
              getMaskGradient(position, start, mid, end),
              index + 2
            )}
          />
        );
      })}

      {/* Last blur layer */}
      <div
        data-slot="progressive-blur-last"
        className="absolute inset-0"
        style={baseStyle(
          blurLevels[blurLevels.length - 1],
          getSingleMaskGradient(position, 87.5, 100),
          blurLevels.length
        )}
      />
    </div>
  );
};

export { ProgressiveBlur };
