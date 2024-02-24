import styled from "styled-components";

interface Props {
  variant: 'default' | 'success' | 'info' | 'error'
}

export const IconWrapper = styled.div<Props>`
  min-width: 3.25rem;

  background-color: ${({ theme, variant }) => {
    if (variant == "default") return theme.colors.white;
    if (variant == "success") return theme.colors.electricGreen;
    if (variant == "info") return theme.colors.caramelGold;
    if (variant == "error") return theme.colors.rubyRed;
  }};

`
