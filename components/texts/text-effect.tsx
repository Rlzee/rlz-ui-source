import { CSSProperties, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

const animationPresets = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "fade-in": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "fade-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  "fade-down": {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  "fade-left": {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  "fade-right": {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  "slide-up": {
    initial: { y: 50 },
    animate: { y: 0 },
    exit: { y: -50 },
  },
  "slide-down": {
    initial: { y: -50 },
    animate: { y: 0 },
    exit: { y: 50 },
  },
  "slide-left": {
    initial: { x: 50 },
    animate: { x: 0 },
    exit: { x: -50 },
  },
  "slide-right": {
    initial: { x: -50 },
    animate: { x: 0 },
    exit: { x: 50 },
  },
  "zoom-in": {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  "zoom-out": {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  },
  "bounce-in": {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
    exit: { scale: 0, opacity: 0 },
  },
  "flip-up": {
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: 90, opacity: 0 },
  },
  "flip-down": {
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 },
  },
  "rotate-in": {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 },
  },
};

interface TextEffectProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  preset?: keyof typeof animationPresets;
  duration?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

const TextEffect = ({
  children,
  preset = "fade-in",
  duration = 0.5,
  delay = 0,
  className = "",
  style = {},
  ...props
}: TextEffectProps) => {
  const animation = animationPresets[preset] || animationPresets["fade-in"];

  const getTransition = () => {
    const baseTransition = { duration, delay };

    if (
      typeof animation.animate === "object" &&
      "transition" in animation.animate &&
      animation.animate.transition
    ) {
      const animateTransition = animation.animate.transition as any;
      return {
        ...baseTransition,
        ...animateTransition,
      };
    }

    return baseTransition;
  };

  return (
    <motion.div
      data-slot="text-effect"
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={getTransition()}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { TextEffect, animationPresets };
