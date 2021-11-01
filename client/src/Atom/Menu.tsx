import { css } from "@emotion/react";

const MenuStyle = css`
  width: 58px;
  height: 71px;
`;

export default function Menu() {
  return (
    <div css={MenuStyle}>
      <img src="./Menu.png" alt="Menu" />
    </div>
  );
}
