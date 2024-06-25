import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import InputMask from "react-input-mask";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  trailingIcon?: React.ReactNode;
  mask?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, trailingIcon, ...props }, ref) => {
    const [showPwd, setShowPwd] = React.useState(false);
    return (
      <div
        className={cn(
          "flex items-center gap-x-2 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm hover:border-1 hover:border-black focus:border-black focus:border-1",
          className
        )}
      >
        {trailingIcon && trailingIcon}
        {mask ? (
          <InputMask
            type={type === "password" ? (showPwd ? "text" : "password") : type}
            className={cn(
              "flex h-8 w-full rounded-md border-none outline-none  text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            )}
            mask={mask}
            {...props}
          />
        ) : (
          <input
            type={type === "password" ? (showPwd ? "text" : "password") : type}
            className={cn(
              "flex h-8 w-full rounded-md border-none outline-none  text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            )}
            ref={ref}
            {...props}
          />
        )}
        {type === "password" &&
          props.value &&
          props.value.toString().length > 0 && (
            <div
              onClick={() => setShowPwd(!showPwd)}
              className="w-[30px] h-[30px] cursor-pointer flex items-center justify-center"
            >
              {showPwd ? <EyeSlash size={20} /> : <Eye size={20} />}
            </div>
          )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
