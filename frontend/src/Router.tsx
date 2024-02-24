import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./components/templates/DefaultLayout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Tasks } from "./pages/Tasks";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout></DefaultLayout>}>
        <Route path="/" element={<SignIn></SignIn>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/tasks" element={<Tasks></Tasks>} />
      </Route>
    </Routes>
  )
}
