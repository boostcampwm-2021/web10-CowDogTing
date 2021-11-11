/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Button } from "./Button";

const StateStyle = css`
  width: 130px;
  height: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  cursor: default;
  border: 2px solid #ffcfcf;
`;

export function CardButton(type: string, state: string) {
  if (type === "ForMe") {
    return (
      <>
        <Button type="small">수락</Button>
        <Button type="small">거절</Button>
      </>
    );
  }
  return <div css={StateStyle}>{state}</div>;
}
