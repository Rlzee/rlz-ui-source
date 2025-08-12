import { cn } from "@/src/ui/lib/utils";

interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  angle?: number;
  cellSize?: number;
  opacity?: number;
  lightLineColor?: string;
  darkLineColor?: string;
}

const getGridStyles = ({
  angle,
  cellSize,
  opacity,
  lightLineColor,
  darkLineColor,
}: Required<
  Pick<
    RetroGridProps,
    "angle" | "cellSize" | "opacity" | "lightLineColor" | "darkLineColor"
  >
>): React.CSSProperties => ({
  "--grid-angle": `${angle}deg`,
  "--cell-size": `${cellSize}px`,
  "--opacity": opacity,
  "--light-line": lightLineColor,
  "--dark-line": darkLineColor,
} as React.CSSProperties);

const RetroGrid = ({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
  ...props
}: RetroGridProps) => {
  const gridStyles = getGridStyles({
    angle,
    cellSize,
    opacity,
    lightLineColor,
    darkLineColor,
  });

  const baseClasses = cn(
    "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
    "opacity-[var(--opacity)]",
    className
  );

  const gridLayerClasses = cn(
    "absolute inset-0 [transform:rotateX(var(--grid-angle))]",
    "animate-grid",
    "[background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)]",
    "[background-repeat:repeat]",
    "[background-size:var(--cell-size)_var(--cell-size)]",
    "[height:300vh] [inset:0%_0px] [margin-left:-200%]",
    "[transform-origin:100%_0_0] [width:600vw]",
    "dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]"
  );

  return (
    <div data-slot="retro-grid" className={baseClasses} style={gridStyles} {...props}>
      <div className={gridLayerClasses} />
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  );
};

export { RetroGrid };
