import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer h-6 w-6 shrink-0 appearance-none rounded-lg border-2 border-border transition-all checked:border-foreground checked:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <Check
          className={cn(
            "absolute left-1 top-1 h-4 w-4 text-background transition-transform scale-0 peer-checked:scale-100",
            className
          )}
        />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };

