import styled, {css} from "styled-components";

type Props = {
  checked: boolean
}

export const InputRadioWrapper = styled.div<Props>`
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.paleSkyBlue};
  color: ${({ theme }) => theme.colors.caramelGold};

  ${({ theme, checked }) =>
    checked &&
    css`
      color: ${theme.colors.paleSkyBlue};
      background-color: ${theme.colors.caramelGold};
  `}
`
