/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import { RequestListType } from "../util/type";
import { Button } from "../Atom/Button";

const ProfileListStyle = css`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
  height: 100vh;
`;
const ProfileFooterStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const ProfileStyle = css`
  margin: 30px 0px;
`;
function CardButton(type: string) {
  if (type === "ForMe") {
    return (
      <>
        <Button type="small">수락</Button>
        <Button type="small">거절</Button>
      </>
    );
  }
  return <>대기중</>;
}
export default function RequestList({ datas, person, setOpenModal, type }: RequestListType) {
  const handleModalClick = (e: React.MouseEvent) => {
    const closestElement = (e.target as HTMLElement).closest(".Profile");
    if (!closestElement) return;
    const { id } = (closestElement as HTMLElement).dataset;
    if (id === undefined) {
      setOpenModal(null);
      return;
    }

    setOpenModal((prev: number) => (prev === Number(id) ? null : Number(id)));
  };
  return (
    <div css={ProfileListStyle} onClick={handleModalClick}>
      {datas?.map((data, idx): React.ReactElement | undefined => {
        const sex = person > 1 ? "team" : data.sex;
        return (
          <div css={ProfileStyle} className="Profile" data-id={idx}>
            <ProfileCard type={sex}>
              <ProfileInfo data={data} />
            </ProfileCard>
            <div css={ProfileFooterStyle}>{CardButton(type)}</div>
          </div>
        );
      })}
    </div>
  );
}
