import { ReactNode } from "react";
import { IconWrapper } from "./styles";

type Props = {
  children: ReactNode;
  variant?: "default" | "success" | "info" | "error"
}
export function Icon({ children, variant = "default" }: Props) {
  return (
    <IconWrapper
      className="flex justify-center items-center py-3 px-2 rounded-xl"
      variant={variant}
    >
      {children}
    </IconWrapper>
  )
}
