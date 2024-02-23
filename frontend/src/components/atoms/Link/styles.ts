import {Link} from "react-router-dom";
import styled,  { css }  from "styled-components";

interface CustomLinkProps {
  variant?: 'default'
}

export const CustomLink = styled(Link) <CustomLinkProps>`
  text-decoration: none;
  ${({ theme, variant }) =>
    variant === 'default' &&
      css`
      color: ${theme.colors.caramelGold};
    `}
`
