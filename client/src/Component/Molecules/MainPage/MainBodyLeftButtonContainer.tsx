/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import LinkButton from "../Core/LinkButton";

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

function MainBodyLeftButtonContainer() {
  const LinkList = [
    { link: "/sub/CowDogPage?person=1", name: "1:1 소개팅" },
    { link: "/sub/CowDogPage?person=2", name: "2:2 미팅" },
    { link: "/sub/CowDogPage?person=3", name: "3:3 미팅" },
    { link: "/sub/CowDogPage?person=4", name: "4:4 미팅" },
    { link: "/sub/teamSetting", name: "팀 설정" },
  ];

  return (
    <div css={mainBodyLeftButtonContainerStyle}>
      {LinkList.map((menu) => (
        <LinkButton url={menu.link} type="Medium" content={menu.name} />
      ))}
    </div>
  );
}

export default MainBodyLeftButtonContainer;
