/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MenuImg from "../assets/Menu.png";

const MenuStyle = css`
  width: 71px;
  height: 71px;
  cursor: pointer;
`;
const buttonStyle = css`
  background: none;
`;
interface MenuProps {
  onClick: () => void;
}
export default function Menu(props: MenuProps) {
  const { onClick } = props;
  return (
    <>
      <button type="button" css={buttonStyle} onClick={onClick}>
        <img src={MenuImg} alt="Menu" css={MenuStyle} />
      </button>
    </>
  );
}
