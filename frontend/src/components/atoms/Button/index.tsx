import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { CustomButton } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default";
}

export default function Button({ children, className, variant, ...attributes }: ButtonProps) {
  return (
    <CustomButton
      className={cn("btn", className)}
      variant={variant}
      {...attributes}
    >
      {children}
    </CustomButton>
  );
}
