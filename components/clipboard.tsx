import { useCopyToClipboard } from "@ui/hooks/use-copy-to-clipboard";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@ui/lib/utils";
import { Tooltip } from "@ui/components/tooltip";
import { cva, type VariantProps } from "class-variance-authority";

const clipboardVariants = cva("", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
    position: {
      absolute: "absolute top-2 right-2 z-10",
      relative: "relative",
    },
  },
  defaultVariants: {
    size: "sm",
    position: "relative",
  },
});

type ClipboardProps = VariantProps<typeof clipboardVariants> & {
  text: string;
  className?: string;
  showTooltip?: boolean;
  tooltipContent?: { copied: string; default: string };
  successDuration?: number;
  onCopy?: (text: string) => void;
  children?: React.ReactNode;
};

const Clipboard = ({
  text,
  className,
  showTooltip = true,
  tooltipContent = { copied: "Copied!", default: "Copy to clipboard" },
  successDuration = 1500,
  onCopy,
  size,
  position,
  children,
}: ClipboardProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: successDuration,
    onCopy: () => onCopy?.(text),
  });

  const handleCopy = () => {
    copyToClipboard(text);
  };

  const button = (
    <button
      onClick={handleCopy}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md transition-[color,box-shadow] outline-none text-muted-foreground/80 hover:text-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed",
        "focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 focus:z-10",
        clipboardVariants({ position }),
        className
      )}
      aria-label={isCopied ? "Copied" : "Copy to clipboard"}
      disabled={isCopied}
    >
      {children || (
        <>
          <div
            className={cn(
              "transition-all",
              isCopied ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}
          >
            <CheckIcon
              className={cn(clipboardVariants({ size }), "stroke-emerald-500")}
              aria-hidden="true"
            />
          </div>
          <div
            className={cn(
              "absolute transition-all",
              isCopied ? "scale-0 opacity-0" : "scale-100 opacity-100"
            )}
          >
            <CopyIcon
              className={cn(clipboardVariants({ size }))}
              aria-hidden="true"
            />
          </div>
        </>
      )}
    </button>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <Tooltip.Root openDelay={0} closeDelay={500}>
      <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
      <Tooltip.Content className="px-2 py-1 text-xs">
        {isCopied ? tooltipContent.copied : tooltipContent.default}
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export { Clipboard };
