import React from "react";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { ImageDiv, Button } from "@Atom/.";
import { MainBodyRightButtonContainer } from "@Molecules/.";

const meetingImage = "Asset/meetingImage.png";
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

export const MainBodyRight = () => {
  return (
    <div css={mainBodyRightStyle}>
      {list.map((item, i) => (
        <ImageDiv key={i} type={item.type} image={meetingImage}>
          <MainBodyRightButtonContainer>
            <MainButton link={item.link} title={item.title} />
          </MainBodyRightButtonContainer>
        </ImageDiv>
      ))}
    </div>
  );
};

const MainButton = ({ link, title }: { link?: string | undefined; title: string }) => {
  if (!link) return <Button size="Medium">{title}</Button>;
  return (
    <Link to={link}>
      <Button size="Medium">{title}</Button>
    </Link>
  );
};

MainButton.defaultProps = {
  link: undefined,
};
