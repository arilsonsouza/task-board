import { InputHTMLAttributes, forwardRef } from "react";
import cn from "classnames";

type TInput = InputHTMLAttributes<HTMLInputElement>

export const InputField = forwardRef<HTMLInputElement, TInput>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("input input-bordered input-md w-full", className)}
        {...rest}
      />
    );
  }
);
