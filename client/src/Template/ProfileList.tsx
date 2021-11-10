/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import { ProfileListType } from "../util/type";

const ProfileListStyle = css`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
  height: 100vh;
`;

const ProfileStyle = css`
  margin: 30px 0px;
`;

export default function ProfileList({ datas, person, setOpenModal }: ProfileListType) {
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
          </div>
        );
      })}
    </div>
  );
}

ProfileList.defaultProps = {
  setOpenModal: () => {},
  profileRef: null,
};
