import { Logo } from "../../atoms/Logo";
import { PencilIcon } from "../../atoms/PencilIcon";
import { HeaderDescription, HeaderTitle } from "./styles";

export function Header() {
  return (
    <header className="flex items-start py-6 gap-2">
      <Logo />
      <div className="flex flex-col gap-2">
        <HeaderTitle>My Task Board</HeaderTitle>
        <HeaderDescription>Tasks to keep organised</HeaderDescription>
      </div>
      <PencilIcon />
    </header>
  )
}
