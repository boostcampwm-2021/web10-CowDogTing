import { css } from "@emotion/react";

const reset = css`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    box-sizing: border-box;
    text-decoration: none;
    color: #000000;
  }
  *::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
export default reset;
