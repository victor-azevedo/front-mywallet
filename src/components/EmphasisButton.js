import React from "react";
import styled from "styled-components";

import { ButtonStyled } from "./Button";

export default function EmphasisButton({ children, text, ...rest }) {
  return (
    <EmphasisButtonStyled {...rest}>
      {children}
      <span>{text}</span>
    </EmphasisButtonStyled>
  );
}

const EmphasisButtonStyled = styled(ButtonStyled)`
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
