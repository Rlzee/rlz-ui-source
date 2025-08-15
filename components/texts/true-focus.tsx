import { useEffect, useRef, useState, CSSProperties } from "react";
import { motion } from "framer-motion";

type TrueFocusProps = {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
};

type FocusRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const TrueFocus = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}: TrueFocusProps) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Auto animation
  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  // Update focus rect
  useEffect(() => {
    const container = containerRef.current;
    const activeWord = wordRefs.current[currentIndex];
    if (container && activeWord) {
      const parentRect = container.getBoundingClientRect();
      const wordRect = activeWord.getBoundingClientRect();
      setFocusRect({
        x: wordRect.left - parentRect.left,
        y: wordRect.top - parentRect.top,
        width: wordRect.width,
        height: wordRect.height,
      });
    }
  }, [currentIndex]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  const wordStyle = (isActive: boolean): CSSProperties => ({
    filter: `blur(${isActive ? 0 : blurAmount}px)`,
    transition: `filter ${animationDuration}s ease`,
  });

  const cornerStyle: CSSProperties = {
    borderColor: "var(--border-color)",
    filter: "drop-shadow(0 0 4px var(--border-color))",
  };

  return (
    <div
      data-slot="true-focus"
      ref={containerRef}
      className="relative flex gap-4 justify-center items-center flex-wrap"
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            data-slot="true-focus-word"
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className="relative text-[3rem] font-black cursor-pointer"
            style={wordStyle(isActive)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        data-slot="true-focus-highlight"
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={
          {
            "--border-color": borderColor,
            "--glow-color": glowColor,
          } as CSSProperties
        }
      >
        {[
          "top-[-10px] left-[-10px] border-r-0 border-b-0",
          "top-[-10px] right-[-10px] border-l-0 border-b-0",
          "bottom-[-10px] left-[-10px] border-r-0 border-t-0",
          "bottom-[-10px] right-[-10px] border-l-0 border-t-0",
        ].map((pos, i) => (
          <span
            data-slot="true-focus-corner"
            key={i}
            className={`absolute w-4 h-4 border-[3px] rounded-[3px] ${pos}`}
            style={cornerStyle}
          />
        ))}
      </motion.div>
    </div>
  );
};

export { TrueFocus };
