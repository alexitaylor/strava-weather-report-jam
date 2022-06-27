import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

const ButtonGroupStyled = styled.div`
  &&& {
    display: flex;

    button {
      border-radius: 0;
      flex: 1 1;
      margin-left: -1px;

      &:hover,
      &:focus {
        z-index: 1;
      }

      &:first-child {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        margin-left: 0;
      }
      &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }
    }
  }
`;

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ButtonGroup = ({ children, ...otherProps }: ButtonGroupProps) => {
  return <ButtonGroupStyled {...otherProps}>{children}</ButtonGroupStyled>;
};

export default ButtonGroup;
