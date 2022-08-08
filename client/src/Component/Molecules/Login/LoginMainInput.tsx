import { css } from "@emotion/react";
import { RefObject } from "react";
import { Input } from "@Atom/.";

const titleStyle = css`
  font-size: 64px;
  text-align: center;
  margin-bottom: 20px;
`;

type props = { idRef: RefObject<HTMLInputElement>; pwRef: RefObject<HTMLInputElement> };
export const LoginMainInput = ({ idRef, pwRef }: props) => {
  return (
    <>
      <div css={titleStyle}>Sign in</div>
      <Input ref={idRef} placeholder="ID" autoComplete="off" />
      <Input ref={pwRef} placeholder="PW" type="password" autoComplete="off" />
    </>
  );
};
