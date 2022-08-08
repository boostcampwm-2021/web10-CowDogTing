import { css } from "@emotion/react";
import { Button } from "@Atom/.";
import { SOCIAL_NAVER_LOGIN, SOCIAL_GITHUB_LOGIN, SOCIAL_KAKAO_LOGIN } from "../../../Util/URL";

const SocialLoginButtonContainerStyle = css`
  div:nth-child(1) {
    margin-top: 20px;
  }
  div:nth-child(2) {
    margin: 10px 0;
  }
`;
export const SocialLoginContainer = () => {
  return (
    <div css={SocialLoginButtonContainerStyle}>
      <a href={`${SOCIAL_NAVER_LOGIN}`}>
        <Button size="Long" color="#2DB400">
          Sign in with Naver
        </Button>
      </a>
      <a href={`${SOCIAL_GITHUB_LOGIN}`}>
        <Button size="Long" color="#000000">
          Sign in with Github
        </Button>
      </a>
      <a href={`${SOCIAL_KAKAO_LOGIN}`}>
        <Button size="Long" color="#f3e84d">
          Sign in with Kakao
        </Button>
      </a>
    </div>
  );
};
