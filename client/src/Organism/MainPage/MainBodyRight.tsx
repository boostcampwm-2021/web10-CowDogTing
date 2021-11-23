/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import meetingImage from "../../assets/meetingImage.png";
import { ImageDiv } from "../../Atom/ImageDiv";
import { Button } from "../../Atom/Button";
import MainBodyRightButtonContainer from "../../Molecules/MainPage/MainBodyRightButtonContainer";

const mainBodyRightStyle = css`
  position: relative;
  display: flex;
  width: 45%;
  height: 70%;
  flex-wrap: wrap;
  top: -3vh;
`;

const list = [
  { type: "short", title: "이벤트" },
  { type: "long", title: "프로젝트 소개" },
  { type: "left-long", title: "공지사항" },
  { type: "short", title: "문의사항" },
];

export default function MainBodyRight() {
  return (
    <div css={mainBodyRightStyle}>
      {list.map((item) => (
        <ImageDiv type={item.type} image={meetingImage}>
          <MainBodyRightButtonContainer>
            <Button type="Medium">{item.title}</Button>
          </MainBodyRightButtonContainer>
        </ImageDiv>
      ))}
    </div>
  );
}
