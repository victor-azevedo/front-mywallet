import { css } from "styled-components";
import { accentColor } from "../../constants/colors";

const buttonStyle = css`
  height: 46px;
  background-color: ${accentColor};
  border-radius: 5px;
  border-style: none;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  padding: 0 20px;
  margin: 8px 0;
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
  }
`;

export default buttonStyle;
