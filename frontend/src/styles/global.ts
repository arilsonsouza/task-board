import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${({theme}) => theme.colors.sapphireBlue};
  }

  body {
    background: ${({theme}) => theme.colors.winterWhite};
    color: ${({theme}) => theme.colors.black};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 0.75rem "Outfit", sans-serif;
  }
`
