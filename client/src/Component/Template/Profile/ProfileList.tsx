import React from "react";
import { css } from "@emotion/react";
import { ProfileListType } from "@Common/type";
import { ProfileComponent } from "./ProfileComponent";

const ProfileListStyle = css`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

type props = ProfileListType;
export const ProfileList = ({ datas, person, handleProfileListContainer, profileRef }: props) => {
  return (
    <div css={ProfileListStyle} aria-hidden="true" onClick={handleProfileListContainer}>
      {datas?.map((data, idx) => {
        const sex = person > 1 ? "team" : data.sex;
        return <ProfileComponent key={idx} sex={sex} data={data} profileRef={profileRef} idx={idx} />;
      })}
    </div>
  );
};
