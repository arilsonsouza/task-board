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

      &:disabled {
        opacity: 0.6;
        color: ${theme.colors.white};
        background-color: ${theme.colors.caramelGold};
        cursor: not-allowed;
      }
    `}
`
