/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ProfileListType } from "../../util/type";
import { handleModalClick } from "../../util";
import ProfileComponent from "./ProfileComponent";

const ProfileListStyle = css`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export default function ProfileList({ datas, person, setOpenModal, profileRef }: ProfileListType) {
  return (
    <div css={ProfileListStyle} onClick={(e) => handleModalClick(e, profileRef, setOpenModal)}>
      {datas?.map((data, idx): React.ReactElement | undefined => {
        const sex = person > 1 ? "team" : data.sex;
        return <ProfileComponent sex={sex} data={data} profileRef={profileRef} idx={idx} />;
      })}
    </div>
  );
}

ProfileList.defaultProps = {
  setOpenModal: () => {},
};
