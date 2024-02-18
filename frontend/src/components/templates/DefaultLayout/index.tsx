import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles";

import { Header } from "../../organisms/Header";

export function DefaultLayout() {
  return (
    <div className="h-screen">
      <LayoutContainer className="h-full flex flex-col gap-6">
        <Header />
        <main className="h-full">
          <Outlet />
        </main>
      </LayoutContainer>
    </div>
  )
}
