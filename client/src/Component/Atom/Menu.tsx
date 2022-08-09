import { css } from "@emotion/react";

const MenuImg = "/Asset/Menu.png";
const MenuStyle = css`
  width: 71px;
  height: 71px;
  cursor: pointer;
`;
const buttonStyle = css`
  background: none;
`;
type MenuProps = { onClick: () => void };
export const Menu = ({ onClick }: MenuProps) => {
  return (
    <button type="button" css={buttonStyle} onClick={onClick}>
      <img src={MenuImg} alt="Menu" css={MenuStyle} />
    </button>
  );
};
