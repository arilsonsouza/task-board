import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles";

import { Header } from "../../organisms/Header";

export function DefaultLayout() {
  return (
    <div className="h-screen">
      <LayoutContainer className="h-full flex flex-col">
        <Header />
        <main className="h-full">
          <Outlet />
        </main>
      </LayoutContainer>
    </div>
  )
}
