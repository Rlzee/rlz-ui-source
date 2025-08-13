
import { cn } from "@ui/lib/utils";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

const FlickeringGrid = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}: FlickeringGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const rgbaPrefix = useMemo(() => {
    if (typeof window === "undefined") return `rgba(0, 0, 0,`;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return `rgba(255, 0, 0,`;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgba(${r}, ${g}, ${b},`;
  }, [color]);

  const setupGrid = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const cols = Math.floor(w / (squareSize + gridGap));
      const rows = Math.floor(h / (squareSize + gridGap));
      const squares = Float32Array.from(
        { length: cols * rows },
        () => Math.random() * maxOpacity
      );

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity]
  );

  const updateSquares = useCallback(
    (squares: Float32Array, delta: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * delta) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity]
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${rgbaPrefix}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    },
    [rgbaPrefix, squareSize, gridGap]
  );

  // Set canvas size on layout
  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const w = width || container.clientWidth;
    const h = height || container.clientHeight;
    setCanvasSize({ width: w, height: h });
  }, [width, height]);

  // Handle animation, observers, and resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let grid = setupGrid(canvas, canvasSize.width, canvasSize.height);
    let frameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!isInView) return;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(grid.squares, delta);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        grid.cols,
        grid.rows,
        grid.squares,
        grid.dpr
      );

      frameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      const w = width || container.clientWidth;
      const h = height || container.clientHeight;
      setCanvasSize({ width: w, height: h });
      grid = setupGrid(canvas, w, h);
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [
    setupGrid,
    updateSquares,
    drawGrid,
    canvasSize.width,
    canvasSize.height,
    width,
    height,
    isInView,
  ]);

  return (
    <div
      data-slot="flickering-grid"
      ref={containerRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas
        data-slot="flickering-grid-canvas"
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};

export { FlickeringGrid };
