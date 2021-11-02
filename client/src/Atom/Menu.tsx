/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const MenuStyle = css`
  width: 71px;
  height: 71px;
  cursor: pointer;
`;
interface MenuProps {
  onClick: () => void;
}
export default function Menu(props: MenuProps) {
  return (
    <>
      <div css={MenuStyle}>
        <img src="./Menu.png" alt="Menu" onClick={props.onClick} />
      </div>
    </>
  );
}
