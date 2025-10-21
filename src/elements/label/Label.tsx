import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../../lib/utils/classname";

const labelVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-gray-900",
        muted: "text-gray-500",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelVariants>;

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
