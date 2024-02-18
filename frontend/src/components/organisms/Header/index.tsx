import { Logo } from "../../atoms/Logo";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer className="flex">
      <Logo />
      <h1>Task Board</h1>
    </HeaderContainer>
  )
}
