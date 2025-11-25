import { cn } from "@ui/lib/utils";
import { ComponentProps, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 text-sm bg-background-secondary  border border-border",
  {
    variants: {
      variant: {
        default: "text-foreground",
        destructive: "text-error",
        warning: "text-warning",
        info: "text-info",
        success: "text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ------------------------------ Root Alert ------------------------------ */

const AlertRoot = ({
  variant,
  className,
  ...props
}: VariantProps<typeof alertVariants> & ComponentProps<"div">) => {
  return (
    <div className={cn(alertVariants({ variant, className }))} {...props} />
  );
};

/* ------------------------------ Alert Title ------------------------------ */

const AlertTitle = ({ className, ...props }: ComponentProps<"h4">) => {
  return <h4 className={cn("text-md font-medium", className)} {...props} />;
};

/* ------------------------------ Alert Description ------------------------------ */

const AlertDescription = ({ className, ...props }: ComponentProps<"p">) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
};

/* ------------------------------ Alert ------------------------------ */

interface AlertProps extends ComponentProps<typeof AlertRoot> {
  icon?: ReactNode;
  title: string;
  description: string;
}

const Alert = ({ icon, title, description, ...props }: AlertProps) => {
  return (
    <AlertRoot {...props}>
      <AlertTitle className="flex items-center justify-start gap-2">
        {icon && icon}
        {title}
      </AlertTitle>
      <AlertDescription className={icon ? "ml-6" : ""}>
        {description}
      </AlertDescription>
    </AlertRoot>
  );
};

/* ------------------------------ Exports ------------------------------ */

const AlertComposed = Object.assign(Alert, {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
});

export {
  AlertComposed as Alert,
  AlertRoot,
  AlertTitle,
  AlertDescription,
  alertVariants,
};
