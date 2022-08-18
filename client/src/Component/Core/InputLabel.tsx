import React from "react";
import { css } from "@emotion/react";
import { Input } from "@Atom/Input/Input";

export const InputLabel: React.FC<InputLabelType> = ({ refProps, label, placeholder }) => {
  return (
    <div css={InputLabelStyle}>
      <p css={LabelStyle}>{label}</p>
      <Input placeholder={placeholder} ref={refProps} />
    </div>
  );
};

type InputLabelType = {
  label: string;
  placeholder?: string;
  refProps?: React.MutableRefObject<HTMLInputElement | null>;
};
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
