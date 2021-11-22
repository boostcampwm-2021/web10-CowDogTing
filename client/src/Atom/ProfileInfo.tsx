/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ProfileInfoDataType } from "../util/type";

const ContainerStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ImageStyle = (props: { image: string }) => css`
  width: 130px;
  height: 130px;
  margin-right: 40px;
  border-radius: 50%;
  border: 1px solid black;
  background-image: url(${props.image});
  display: flex;
  align-items: center;
`;

const InfoStyle = css`
  & div {
    margin: 10px 0;
  }
`;
export default function ProfileInfo({ data }: ProfileInfoDataType): JSX.Element {
  const { id, image, location, sex, age, info } = data;

  return (
    <div css={ContainerStyle}>
      <div css={ImageStyle({ image: String(image) })} />
      <div css={InfoStyle}>
        <div>제목 : {id}</div>
        <div>지역 : {location}</div>
        <div>성별 : {sex === "female" ? "여성" : "남성"}</div>
        <div>나이 : {age}</div>
        <div>소개 : {info}</div>
      </div>
    </div>
  );
}
