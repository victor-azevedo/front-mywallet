import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { linkTextColor } from "../constants/colors";

export default function Redirect({ message, to, linkMessage }) {
  return (
    <RedirectStyled>
      {message + " "}
      <Link to={to}>{linkMessage}</Link>;
    </RedirectStyled>
  );
}

const LINK_COLOR = linkTextColor;

const RedirectStyled = styled.span`
  color: ${LINK_COLOR};
  margin-top: 20px;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  a {
    text-decoration-line: underline;
  }
`;
