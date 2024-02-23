import styled,  { css } from 'styled-components'

interface ButtonProps {
  variant?: 'default'
}

export const CustomButton = styled.button<ButtonProps>`
  color: ${({ theme }) => theme.colors.white};

 ${({ theme, variant }) =>
    variant === 'default' &&
      css`

      background-color: ${theme.colors.caramelGold};
      &:hover {
        background-color: ${theme.colors.caramelGold};
      }
    `}
`
