import { InputHTMLAttributes, forwardRef } from "react";
import cn from "classnames";

type TInput = InputHTMLAttributes<HTMLTextAreaElement>

export const TextField = forwardRef<HTMLTextAreaElement, TInput>(
  ({ className, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn("textarea textarea-bordered h-24", className)}
        {...rest}
      />
    );
  }
);
