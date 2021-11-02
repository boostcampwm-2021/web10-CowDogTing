/* eslint-disable no-console */
/* eslint-disable no-unneeded-ternary */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import ProfileInfo from "../Atom/ProfileInfo";
import { Modal } from "../Molecules/Modal";
import { ProfileInfoDataType, ProfileType } from "../util/type";
import RightBtn from "../assets/RightButton.svg";
import LeftBtn from "../assets/LeftButton.svg";

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
  ${!props.visiable && { visibility: "hidden" }};
`;

export default function ProfileModal({ data }: ProfileInfoDataType): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [target, setTarget] = useState<ProfileType | null>(data);
  const [datas, setDatas] = useState<ProfileType[] | null>(null);

  useEffect(() => {
    setTarget(data);
    setIndex(0);
  }, [data]);

  useEffect(() => {
    if (datas) {
      setTarget(datas[index]);
    }
  }, [index]);

  useEffect(() => {
    const { member } = data;
    const teamPerson = member ? member : [];
    setDatas([data, ...teamPerson]);
  }, []);

  const inCreaseIndex = () => {
    setIndex((prev) => prev + 1);
    setTarget(datas ? datas[index] : null);
  };

  const decreaseIndex = () => {
    setIndex((prev) => prev - 1);
    setTarget(datas ? datas[index] : null);
  };

  if (!target) return <div>로딩중...</div>;

  return (
    <Modal type="Large">
      <div css={InfoContainer}>
        <div css={LeftButton({ visiable: index > 0 })} onClick={decreaseIndex} />
        <ProfileInfo data={target} />
        <div css={RightButton({ visiable: index + 1 !== datas?.length })} onClick={inCreaseIndex} />
      </div>
      <Button type="Large">채팅 신청하기</Button>
    </Modal>
  );
}
