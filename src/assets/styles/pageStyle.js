import { css } from "styled-components";
import { baseColor } from "../../constants/colors";

const pageStyle = css`
  width: 100vw;
  height: 100vh;
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${baseColor};
`;

export default pageStyle;
