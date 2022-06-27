import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  &.btn {
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    flex-direction: row;
    font-size: 14px;
    justify-content: center;
    min-height: 32px;
    padding: 6px 10px;
    touch-action: manipulation;
    transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
    user-select: none;
    white-space: nowrap;
    will-change: background-color, border-color, color;
  }

  &.btn:focus,
  &.btn:active:focus {
    outline-offset: -2px;
  }

  &.btn:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    outline: 0;
  }

  &.btn[disabled] {
    box-shadow: none;
    cursor: default;
    opacity: 0.65;
    pointer-events: none;
  }

  //
  // Default styles
  //
  &.default {
    background-color: var(--white);
    border-color: var(--n30-silver);
    color: var(--text-color);

    &:link,
    &:visited {
      background-color: var(--white);
      border-color: var(--n30-silver);
      color: var(--text-color);
    }

    &:focus {
      background-color: darken(var(--white), 10%);
      border-color: darken(var(--n30-silver), 25%);
      color: var(--text-color);
    }
    &:hover {
      background-color: darken(var(--white), 10%);
      border-color: darken(var(--n30-silver), 12%);
      color: var(--text-color);
    }
    &:active {
      background-color: darken(var(--white), 10%);
      border-color: darken(var(--n30-silver), 12%);
      color: var(--text-color);
    }
  }

  &.default[disabled]:hover {
    background-color: var(--white);
    border-color: var(--n30-silver);
    color: var(--text-color);
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, className = '', ...otherProps }: ButtonProps) => {
  const classNames = ['btn', 'default', className];

  return (
    <ButtonStyled className={classNames.join(' ')} {...otherProps}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
