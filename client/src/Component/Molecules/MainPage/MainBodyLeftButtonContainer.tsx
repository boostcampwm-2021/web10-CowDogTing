import React from "react";
import { css } from "@emotion/react";
import { LinkButton } from "../../Core/LinkButton";

const mainBodyLeftButtonContainerStyle = css`
  display: none;
  top: 100px;
  left: 100px;
  width: 30vw;
  height: 30vh;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LinkList = [
  { link: "/CowDogPage?person=1", name: "1:1 소개팅" },
  { link: "/CowDogPage?person=2", name: "2:2 미팅" },
  { link: "/CowDogPage?person=3", name: "3:3 미팅" },
  { link: "/CowDogPage?person=4", name: "4:4 미팅" },
  { link: "/teamSetting", name: "팀 설정" },
];
export const MainBodyLeftButtonContainer = () => {
  return (
    <div css={mainBodyLeftButtonContainerStyle}>
      {LinkList.map((menu, i) => (
        <LinkButton key={i} url={menu.link} type="Medium" content={menu.name} />
      ))}
    </div>
  );
};
