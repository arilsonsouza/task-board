import { Outlet } from "react-router-dom";
import { MainContainer } from "./styles";

import { Header } from "../../organisms/Header";

export function DefaultLayout() {
  return (

    <MainContainer>
      <Header />
      <Outlet />
    </MainContainer>
  )
}
