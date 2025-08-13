
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@ui/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type TextRevealProps = {
  children: string;
  className?: string;
  blur?: number;
  opacity?: number;
  rotation?: number;
};

const TextReveal = ({
  children,
  className,
  blur = 4,
  opacity = 0.1,
  rotation = 5,
}: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".reveal-word");

    gsap.fromTo(
      container,
      { rotate: rotation },
      {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      words,
      {
        opacity,
        filter: `blur(${blur}px)`,
        y: 20,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom-=10%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [blur, opacity, rotation]);

  return (
    <div
      data-slot="text-reveal"
      className={cn("relative z-0 h-[200vh]", className)}
    >
      <div
        data-slot="text-reveal-container"
        ref={containerRef}
        className="sticky top-0 mx-auto flex h-[50%] max-w-7xl items-center px-4 py-20"
      >
        <span
          data-slot="text-reveal-content"
          className="flex flex-wrap text-2xl font-bold text-black/20 dark:text-white/20 md:text-3xl lg:text-4xl xl:text-5xl"
        >
          {children.split(" ").map((word, i) => (
            <span
              data-slot="text-reveal-word"
              key={i}
              className="relative mx-1"
            >
              <span
                data-slot="text-reveal-word-opacity"
                className="absolute opacity-30"
              >
                {word}
              </span>
              <span
                data-slot="text-reveal-word-foreground"
                className="reveal-word text-foreground"
              >
                {word}
              </span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export { TextReveal };
