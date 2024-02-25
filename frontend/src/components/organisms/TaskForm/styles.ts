import styled from "styled-components";

export const SaveTaskButton = styled.button`
  background-color: ${({ theme }) => theme.colors.sapphireBlue};

  &:not(:disabled):hover {
    opacity: .9;
    transition: opacity 0.2s;
  }

  &:disabled {
    opacity: .7;
    cursor: not-allowed;
  }
`

export const DeleteTaskButton = styled(SaveTaskButton)`
  background-color: ${({ theme }) => theme.colors.duskBlue};
`
