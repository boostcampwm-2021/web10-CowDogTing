/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React from "react";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";

const IdContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const RegisterContainerStyle = css`
  width: 450px;
  margin: 0 auto;
  margin-top: 50px;
`;
export default function RegisterPage() {
  return (
    <div css={RegisterContainerStyle}>
      <div>ID</div>
      <div css={IdContainerStyle}>
        <Input placeholder="ID" autoComplete="off" />
        <Button type="Small"> 아이디 체크 </Button>
      </div>
    </div>
  );
}
