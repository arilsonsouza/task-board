import { ReactNode } from "react";
import { LinkProps } from "react-router-dom";
import cn from "classnames";

import { CustomLink } from "./styles";

interface ButtonProps extends LinkProps {
  children: ReactNode;
  variant?: "default";
}

export function Link({ children, className, variant = "default", ...rest }: ButtonProps) {
  return (
    <CustomLink
      variant={variant}
      className={cn("link", className)}
      {...rest}>
      {children}
    </CustomLink>
  )
}
