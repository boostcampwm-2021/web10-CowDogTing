import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ImageDivType } from "../util/type";

const bigImageDivStyle = css`
  width: 45%;
  height: 70%;
`;
const shortImageDivStyle = css`
  width: 40%;
  height: 30%;
  margin: 3%;
`;
const longImageDivStyle = css`
  width: 40%;
  height: 60%;
  margin: 3%;
`;

const leftLongImageDivStyle = css`
  position: relative;
  width: 40%;
  height: 60%;
  margin: 3%;
  top: -30%;
`;
const ImageDivStyle = (props: ImageDivType) => css`
  ${props.type === "big" && bigImageDivStyle}
  ${props.type === "long" && longImageDivStyle}
  ${props.type === "short" && shortImageDivStyle}
  ${props.type === "left-long" && leftLongImageDivStyle}
  background-image: url(${props.image});
  background-size: cover;
`;

export const ImageDiv = styled.div`
  ${ImageDivStyle}
`;
