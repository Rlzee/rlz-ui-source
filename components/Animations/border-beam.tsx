
import { cn } from "@ui/lib/utils";
import { motion, MotionStyle, Transition } from "framer-motion";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

const BorderBeam = ({
  className,
  size = 50,
  duration = 6,
  delay = 0,
  colorFrom = "hsl(var(--primary))",
  colorTo = "hsl(var(--primary) / 0.6)",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) => {
  const offsetAnimation = reverse
    ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
    : [`${initialOffset}%`, `${100 + initialOffset}%`];

  const beamStyle: MotionStyle = {
    width: size,
    offsetPath: `rect(0 auto auto 0 round ${size}px)`,
    "--color-from": colorFrom,
    "--color-to": colorTo,
    ...style,
  } as MotionStyle & React.CSSProperties;

  return (
    <div
      data-slot="border-beam"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border-transparent",
        "[mask-clip:padding-box,border-box]",
        "[mask-composite:intersect]",
        "[mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      )}
      style={
        {
          "--border-beam-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <motion.div
        data-slot="border-beam-animation"
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className
        )}
        style={beamStyle}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{ offsetDistance: offsetAnimation }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};

export { BorderBeam };
