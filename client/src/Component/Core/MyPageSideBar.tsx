import { css } from "@emotion/react";
import { SideBarDiv } from "@Atom/.";

const SideBarStyle = css`
  width: 10vw;
  height: 80vh;
  border-left: 1px solid black;
  border-right: 1px solid black;
  margin-right: 5vw;
  div {
    border-bottom: 1px solid black;
    &:first-child {
      margin-top: 80px;
      border-top: 1px solid black;
    }
  }
`;

const SideBarList = [
  { menu: "내 정보 보기", link: "myinfo" },
  { menu: "내가 고른 이상형", link: "likelist" },
  { menu: "나의 문의사항 보기", link: "question" },
  { menu: "리뷰 보기", link: "review" },
];
export const MyPageSideBar = () => {
  return (
    <div css={SideBarStyle}>
      {SideBarList.map((el) => (
        <SideBarDiv key={el.menu} menu={el.menu} link={el.link} />
      ))}
    </div>
  );
};
