import styled, {css} from "styled-components";
import checkedIcon from '../../../assets/images/Done_round_duotone.svg'

type Props = {
  checked: boolean
}

export const InputRadioWrapper = styled.div<Props>`
   ${({ theme, checked }) =>
    checked &&
    css`
      border-color: ${theme.colors.sapphireBlue};
    `}
`

export const CheckedIconWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${({theme}) => theme.colors.sapphireBlue};
  background-image: url(${checkedIcon});
`
