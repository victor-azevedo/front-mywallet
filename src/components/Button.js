import React from "react";
import styled from "styled-components";

import { accentColor, buttonTextColor } from "../constants/colors";

export default function Button({ children, ...rest }) {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
}

const BUTTON_BG_COLOR = accentColor;
const BUTTON_COLOR = buttonTextColor;
const BUTTON_MARGIN = "24px";

const ButtonStyled = styled.button`
  width: 100%;
  background-color: ${BUTTON_BG_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: ${BUTTON_MARGIN} 0;
  padding: 16px 12px;
  color: ${BUTTON_COLOR};
  font-size: 20px;
  font-weight: 700;
  text-transform: capitalize;
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
`;
