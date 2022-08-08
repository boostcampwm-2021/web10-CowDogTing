import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ImageDivType } from "../../util/type";

const bigImageDivStyle = css`
  width: 40vw;
  height: 60vh;
`;
const shortImageDivStyle = css`
  width: 20vw;
  height: 20vh;
  margin: 3%;
`;
const longImageDivStyle = css`
  width: 20vw;
  height: 40vh;
  margin: 3%;
`;

const leftLongImageDivStyle = css`
  position: relative;
  width: 20vw;
  height: 40vh;
  margin: 3%;
  top: -30%;
`;
const leftLongDivStyle = css`
  top: -30%;
`;
const ImageDivStyle = (props: ImageDivType) => css`
  position: relative;
  height: fit-content;
  margin: 0% 2%;
  ${props.type === "left-long" && leftLongDivStyle}
  &::before {
    content: "";
    left: 0px;
    top: 0px;
    background: url(${props.image});
    background-size: cover;
    display: inline-block;
    ${props.type === "big" && bigImageDivStyle}
    ${props.type === "long" && longImageDivStyle}
    ${props.type === "short" && shortImageDivStyle}
    ${props.type === "left-long" && leftLongImageDivStyle}
  }
  &:hover::before {
    opacity: 0.6;
  }
  &:hover div {
    display: flex;
  }
`;

export const ImageDiv = styled.div`
  ${ImageDivStyle}
`;
