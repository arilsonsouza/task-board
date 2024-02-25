import styled from "styled-components";

export const AddTaskButton = styled.label`
  height: 5.25rem;
  background-color: ${({ theme }) => theme.colors.vanillaCream};
  outline: none;

  span {
    font-size: medium;
    font-size: 1rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.blushPink};
    background-color: ${({ theme }) => theme.colors.blushPink};
  }
`

export const CloseDrawerButton = styled.label`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.transparentBlack};

  &:hover {
    border-color: ${({ theme }) => theme.colors.sunshineYellow};
  }
`
