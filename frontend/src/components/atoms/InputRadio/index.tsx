import { InputHTMLAttributes, forwardRef } from "react";
import cn from "classnames";

type TInput = InputHTMLAttributes<HTMLInputElement>

export const InputRadio = forwardRef<HTMLInputElement, TInput>(
  ({ className, ...rest }, ref) => {
    return (
      <input type="radio"
        ref={ref}
        className={cn("radio ", className)}
        {...rest}
      />
    );
  }
);
