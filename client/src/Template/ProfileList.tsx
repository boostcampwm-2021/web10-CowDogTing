/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import { ProfileListType } from "../util/type";

const ProfileListStyle = css`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const ProfileStyle = css`
  margin: 30px 0px;
`;

const bodyStyle = css`
  width: 100%;
  height: 100vh;
`;

export default function ProfileList({ datas, person, setOpenModal }: ProfileListType) {
  const handleModalClick = (e: React.MouseEvent) => {
    const { id } = (e.target as HTMLElement).dataset;
    console.log("???");
    console.log(id);
    if (id === undefined) {
      setOpenModal(null);
      return;
    }
    setOpenModal((prev: number) => (prev === Number(id) ? null : Number(id)));
  };
  return (
    <div onClick={handleModalClick} css={bodyStyle}>
      <div css={ProfileListStyle}>
        {datas?.map((data): React.ReactElement | undefined => {
          const sex = person > 1 ? "team" : data.sex;
          return (
            <div css={ProfileStyle}>
              <ProfileCard type={sex}>
                <ProfileInfo data={data} />
              </ProfileCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
