/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ButtonType } from "../util/type";

const SmallButtonStyle = css`
  height: 50px;
`;

const MediumButtonStyle = css`
  height: 100px;
`;

const LargeButtonStyle = css`
  width: 150px;
  height: 100px;
`;

const LongButtonStyle = css`
  width: 150px;
  height: 100px;
`;

const ButtonStyle = (props: ButtonType) => css`
  ${props.type === "Small" && SmallButtonStyle}
  ${props.type === "Medium" && MediumButtonStyle}
  ${props.type === "Large" && LargeButtonStyle}
  ${props.type === "Long" && LongButtonStyle}
`;

export const Button = styled.div`
  width: 100px;
  border: 1px solid #ffcfcf;
  &:hover {
    background-color: #ffcfcf;
    color: #ffffff;
  }
  ${ButtonStyle};
`;
