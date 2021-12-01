/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import meetingImage from "../../assets/meetingImage.png";
import { Button } from "../../Atom/Button";
import { ImageDiv } from "../../Atom/ImageDiv";
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
  { type: "long", title: "프로젝트 소개", link: "/Project" },
  { type: "left-long", title: "공지사항" },
  { type: "short", title: "문의사항" },
];

export default function MainBodyRight() {
  return (
    <div css={mainBodyRightStyle}>
      {list.map((item) => (
        <ImageDiv type={item.type} image={meetingImage}>
          <MainBodyRightButtonContainer>
            <MainButton link={item.link} title={item.title} />
          </MainBodyRightButtonContainer>
        </ImageDiv>
      ))}
    </div>
  );
}

function MainButton({ link, title }: { link?: string | undefined; title: string }) {
  if (!link) return <Button type="Medium">{title}</Button>;
  return (
    <Link to={link}>
      <Button type="Medium">{title}</Button>
    </Link>
  );
}

MainButton.defaultProps = {
  link: undefined,
};
