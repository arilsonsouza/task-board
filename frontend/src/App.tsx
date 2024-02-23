import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Router } from "./Router"
import { NotificationProvider } from "./contexts/NotificationContext"
import { Notification } from "./components/organisms/Notification"

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <NotificationProvider>
          <Router></Router>
          <Notification />
        </NotificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
