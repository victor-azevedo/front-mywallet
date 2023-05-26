import React from "react";
import styled from "styled-components";

import { accentColor, buttonTextColor } from "../constants/colors";

export default function EmphasisButton({ children, text, ...rest }) {
  return (
    <ButtonStyled {...rest}>
      {children}
      <span>{text}</span>
    </ButtonStyled>
  );
}

const BUTTON_BG_COLOR = accentColor;
const BUTTON_COLOR = buttonTextColor;

const ButtonStyled = styled.button`
  width: 100%;
  background-color: ${BUTTON_BG_COLOR};
  color: ${BUTTON_COLOR};
  border-radius: 5px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 20px 15px -15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:active {
    box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px -5px;
  }
  &:disabled {
    opacity: 0.7;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px -15px;
  }

  height: 100%;
  flex: 1 0 45%;
  margin: 0;
  padding: 10px 10px;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 12px;
  text-transform: none;
  span {
    display: block;
    max-width: 85px;
    text-align: left;
  }
`;
