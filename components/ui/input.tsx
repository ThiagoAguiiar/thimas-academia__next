import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  trailingIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, trailingIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-x-2 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm hover:border-1 hover:border-black focus:border-black focus:border-1",
          className
        )}
      >
        {trailingIcon && trailingIcon}
        <input
          type={type}
          className={cn(
            "flex h-8 w-full rounded-md border-none outline-none  text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
