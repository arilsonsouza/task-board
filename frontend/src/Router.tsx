import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./components/templates/DefaultLayout";
import { SignIn } from "./pages/SignIn";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout></DefaultLayout>}>
        <Route path="/" element={<SignIn></SignIn>} />
      </Route>
    </Routes>
  )
}
