import { css } from "styled-components";
import { textColor } from "../../constants/colors";

const inputStyle = css`
  height: 58px;
  background-color: #ffffff;
  border-radius: 5px;
  border-style: none;
  font-size: 20px;
  font-weight: 400;
  margin: 8px 0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: ${textColor};
  &::placeholder {
    color: ${textColor};
  }
  &:disabled {
    opacity: 0.7;
  }
`;

export default inputStyle;
