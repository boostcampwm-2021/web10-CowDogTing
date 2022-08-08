import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { Button } from "../../Atom/Button";

const ButtonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default function LoginButtonContainer({ onClick }: { onClick: () => Promise<void> }) {
  return (
    <div css={ButtonContainerStyle}>
      <Link to="/sub/Register">
        <Button type="Small">회원가입</Button>
      </Link>
      <Button type="Small" onClick={onClick}>
        로그인
      </Button>
    </div>
  );
}
