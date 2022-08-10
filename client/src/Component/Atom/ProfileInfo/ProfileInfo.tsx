import React from "react";
import { css } from "@emotion/react";
import { ProfileType } from "@Util/type";
import { ProfileImage } from "../ProfileImage/ProfileImage";

const ContainerStyle = css`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const InfoStyle = css`
  & div {
    margin: 10px 0;
  }
`;

export const ProfileInfo = ({ id, image, location, sex, age, info, member }: ProfileType) => {
  const infoSex = sex === "female" ? "여성" : "남성";
  const infoAge = Math.floor((member?.reduce((acc, cur) => acc + Number(cur.age), age) ?? age) / ((member?.length ?? 0) + 1));
  return (
    <div css={ContainerStyle}>
      <ProfileImage type="Small" image={image ? String(image) : "/Asset/defaultImage.png"} />
      <div css={InfoStyle}>
        <div>제목 : {id}</div>
        <div>지역 : {location}</div>
        <div>성별 : {infoSex}</div>
        <div>나이 : {infoAge}</div>
        <div>소개 : {info}</div>
      </div>
    </div>
  );
};

ProfileInfo.defaultProps = {
  gid: 0,
  idx: 0,
  member: [],
};