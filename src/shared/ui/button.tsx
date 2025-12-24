import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.96] active:transition-transform active:duration-100",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.14),0_0_2px_rgba(0,0,0,0.12)] hover:bg-primary/90 hover:shadow-[0_2px_4px_rgba(0,0,0,0.14),0_0_2px_rgba(0,0,0,0.12)] hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_1px_2px_rgba(0,0,0,0.14),0_0_2px_rgba(0,0,0,0.12)] hover:bg-destructive/90 hover:shadow-[0_2px_4px_rgba(0,0,0,0.14),0_0_2px_rgba(0,0,0,0.12)] hover:-translate-y-0.5",
        outline:
          "border border-input/60 bg-background shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-accent/50 hover:text-accent-foreground hover:border-input hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-secondary/80 hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5 rounded-xl",
        sm: "h-9 px-4 rounded-lg text-xs",
        lg: "h-12 px-7 rounded-xl text-base",
        xl: "h-14 px-9 rounded-2xl text-lg font-semibold",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

