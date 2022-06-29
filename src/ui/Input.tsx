import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const InputStyled = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.24rem;
    color: #494950;
    font-weight: 400;
    margin-bottom: 4px;
  }
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, value, type, name, onChange }: InputProps) => {
  return (
    <InputStyled>
      <label>{label}</label>
      <input value={value} type={type} name={name} onChange={onChange} />
    </InputStyled>
  );
};

export default Input;
