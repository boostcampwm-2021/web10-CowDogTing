/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Input } from "../Atom/Input";
import { InputLabelType } from "../util/type";

const InputLabelStyle = css`
  margin: 1% 2%;
  width: 150px;
  height: 300px;
`;

const LabelStyle = css`
  height: 20%;
  width: 90%;
`;
function InputLabel({ label }: InputLabelType) {
  return (
    <div css={InputLabelStyle}>
      <p css={LabelStyle}>{label}</p>
      <Input />
    </div>
  );
}

export default InputLabel;
