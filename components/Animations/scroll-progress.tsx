
import { cn } from "@ui/lib/utils";
import { motion, MotionProps, useScroll } from "framer-motion";
import React from "react";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-primary/30 via-primary to-primary/60",
          className
        )}
        style={{
          scaleX: scrollYProgress,
        }}
        {...props}
      />
    );
  }
);

export { ScrollProgress };
