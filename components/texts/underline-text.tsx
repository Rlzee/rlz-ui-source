import { Ref } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/src/ui/lib/utils";

type UnderlineTextProps = {
  text: string;
  className?: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
  ref?: Ref<HTMLDivElement>;
};

const UnderlineText = ({
  text,
  textClassName,
  underlineClassName,
  underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
  underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
  underlineDuration = 1.5,
  ref,
  className,
}: UnderlineTextProps) => {
  const pathVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: underlineDuration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      ref={ref}
      data-slot="underline-text"
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
    >
      <div className="relative">
        <motion.h1
          data-slot="underline-text-h1"
          className={cn("text-4xl font-bold text-center", textClassName)}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          {text}
        </motion.h1>

        <motion.svg
          data-slot="underline-text-svg"
          width="100%"
          height="20"
          viewBox="0 0 300 20"
          className={cn("absolute -bottom-4 left-0", underlineClassName)}
          preserveAspectRatio="none"
        >
          <motion.path
            data-slot="underline-text-path"
            d={underlinePath}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              d: underlineHoverPath,
              transition: { duration: 0.8 },
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export { UnderlineText };
