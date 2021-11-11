/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Input } from "../Atom/Input";
import { InputLabelType } from "../util/type";

const InputLabelStyle = css`
  margin: 1% 2%;
  width: 300px;
  height: 150px;
  text-align: center;
`;

const LabelStyle = css`
  height: 20%;
  width: 90%;
`;
function InputLabel(props: InputLabelType) {
  const { refProps, label, placeholder } = props;
  return (
    <div css={InputLabelStyle}>
      <p css={LabelStyle}>{label}</p>
      <Input placeholder={placeholder} ref={refProps} />
    </div>
  );
}

export default InputLabel;
