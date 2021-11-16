import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
/** @jsxImportSource @emotion/react */

const SocialLoginButtonContainerStyle = css`
  div:nth-child(1) {
    margin-top: 20px;
  }
  div:nth-child(2) {
    margin: 10px 0;
  }
`;
export default function SocialLoginContainer() {
  return (
    <div css={SocialLoginButtonContainerStyle}>
      <a href="http://localhost:4000/api/auth/naver">
        <Button type="Long" color="#2DB400">
          Sign in with Naver
        </Button>
      </a>
      <a href="http://localhost:4000/api/auth/github">
        <Button type="Long" color="#000000">
          Sign in with Github
        </Button>
      </a>
      <a href="http://localhost:4000/api/auth/kakao">
        <Button type="Long" color="#f3e84d">
          Sign in with Kakao
        </Button>
      </a>
    </div>
  );
}
