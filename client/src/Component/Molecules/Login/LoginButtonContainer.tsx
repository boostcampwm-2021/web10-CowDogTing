import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { Button } from "@Atom/.";

const ButtonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LoginButtonContainer = ({ onClick }: { onClick: () => Promise<void> }) => {
  return (
    <div css={ButtonContainerStyle}>
      <Link to="/sub/Register">
        <Button size="Small">회원가입</Button>
      </Link>
      <Button size="Small" onClick={onClick}>
        로그인
      </Button>
    </div>
  );
};
