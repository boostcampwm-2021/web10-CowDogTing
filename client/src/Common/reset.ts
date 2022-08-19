import { css } from "@emotion/react";

const reset = css`
  @font-face {
    font-family: "BMDOHYEON";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    box-sizing: border-box;
    text-decoration: none;
    color: #000000;
    font-family: "BMDOHYEON";
  }
  *::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
export default reset;
