import styled from "styled-components";

interface Props {
  variant: 'in_progress' | 'completed' | 'canceled'
}

export const TaskCardWrapper = styled.div<Props>`
  cursor: pointer;

  background-color: ${({ theme, variant }) => {
    if (variant == "in_progress") return theme.colors.sunshineYellow;
    if (variant == "completed") return theme.colors.springBreezeGreen;
    if (variant == "canceled") return theme.colors.blushPink;
  }};

`
