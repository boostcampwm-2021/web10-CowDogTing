/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import meetingImage from "../assets/meetingImage.png";
import { ImageDiv } from "../Atom/ImageDiv";
import { Button } from "../Atom/Button";
import MainBodyRightButtonContainer from "../Molecules/MainBodyRightButtonContainer";

const mainBodyRightStyle = css`
  position: relative;
  display: flex;
  width: 45%;
  height: 70%;
  flex-wrap: wrap;
  top: -3vh;
`;

function MainBodyRight() {
  return (
    <div css={mainBodyRightStyle}>
      <ImageDiv type="short" image={meetingImage}>
        <MainBodyRightButtonContainer>
          <Button type="Medium">이벤트</Button>
        </MainBodyRightButtonContainer>
      </ImageDiv>
      <ImageDiv type="long" image={meetingImage}>
        <MainBodyRightButtonContainer>
          <Button type="Medium">프로젝트 소개</Button>
        </MainBodyRightButtonContainer>
      </ImageDiv>
      <ImageDiv type="left-long" image={meetingImage}>
        <MainBodyRightButtonContainer>
          <Button type="Medium">공지 사항</Button>
        </MainBodyRightButtonContainer>
      </ImageDiv>
      <ImageDiv type="short" image={meetingImage}>
        <MainBodyRightButtonContainer>
          <Button type="Medium">문의 사항</Button>
        </MainBodyRightButtonContainer>
      </ImageDiv>
    </div>
  );
}

export default MainBodyRight;
