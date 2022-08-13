import React from "react";
import { css } from "@emotion/react";
import { Modal } from "@Core/Modal";

type LargeModalType = {
  children: React.ReactNode[];
  length: number;
  decreaseIndex: (e: React.MouseEvent<HTMLElement>) => void;
  inCreaseIndex: (e: React.MouseEvent<HTMLElement>) => void;
  index: number;
};

export const LargeModal = ({ index, children, length, decreaseIndex, inCreaseIndex }: LargeModalType) => {
  const inCrease = (e: React.MouseEvent<HTMLElement>): void => inCreaseIndex(e);
  const decrease = (e: React.MouseEvent<HTMLElement>): void => decreaseIndex(e);

  return (
    <Modal type="Large">
      <div css={InfoContainer}>
        <div aria-hidden css={LeftButton({ visiable: index > 0 })} onClick={decrease} />
        {children[0]}
        <div aria-hidden css={RightButton({ visiable: index + 1 === length })} onClick={inCrease} />
      </div>
      {children[1]}
    </Modal>
  );
};

const RightBtn = "/Asset/RightButton.svg";
const LeftBtn = "/Asset/LeftButton.svg";

const InfoContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const LeftButton = (props: { visiable: boolean }) => css`
  background-image: url(${LeftBtn});
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  float: left;
  ${!props.visiable && { visibility: "hidden" }};
`;

const RightButton = (props: { visiable: boolean }) => css`
  background-image: url(${RightBtn});
  width: 100px;
  height: 100px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  float: right;
  ${props.visiable && { visibility: "hidden" }};
`;
