import React from "react";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";

import {
  inputTextColor,
  labelTextColor,
  lightTextColor,
} from "../constants/colors";

export default function Input({ label, value, isCurrency, ...rest }) {
  return (
    <InputStyled inputValue={value}>
      <label>{label}</label>
      {isCurrency ? <CurrencyInput {...rest} /> : <input {...rest} />}
    </InputStyled>
  );
}

const LABEL_COLOR = labelTextColor;
const INPUT_COLOR = inputTextColor;
const INPUT_BG_COLOR = "#FFF";
const PLACEHOLDER_COLOR = lightTextColor;

const InputStyled = styled.div`
  width: 100%;
  margin-top: 12px;
  label {
    color: ${LABEL_COLOR};
    font-size: 16px;
    font-weight: 600;
    transition: opacity 0.2s ease-in-out;
    opacity: ${({ inputValue }) => (inputValue ? 1 : 0)};
  }
  input {
    width: 100%;
    margin-top: 4px;
    padding: 16px 12px;
    color: ${INPUT_COLOR};
    font-size: 20px;
    font-weight: 400;
    background-color: ${INPUT_BG_COLOR};
    border-radius: 4px;
    border-style: none;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 20px 15px -15px;
    &::placeholder :-ms-input-placeholder ::-ms-input-placeholder {
      color: ${PLACEHOLDER_COLOR};
    }
    &:disabled {
      opacity: 0.7;
    }
  }
`;
