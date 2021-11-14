/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import { ProfileListType } from "../util/type";
import { handleModalClick } from "../util";

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
  max-height: 200px;
  margin: 30px 0px;
`;

export default function ProfileList({ datas, person, setOpenModal, profileRef }: ProfileListType) {
  return (
    <div css={ProfileListStyle} onClick={(e) => handleModalClick(e, profileRef, setOpenModal)}>
      {datas?.map((data, idx): React.ReactElement | undefined => {
        const sex = person > 1 ? "team" : data.sex;
        return (
          <div css={ProfileStyle} ref={(el) => ((profileRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)} data-id={idx}>
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
};
