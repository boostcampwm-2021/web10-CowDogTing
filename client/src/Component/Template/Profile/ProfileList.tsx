import React, { RefObject } from "react";
import { css } from "@emotion/react";
import { PersonInfoType, ProfileType } from "@Common/type";
import { ProfileComponent } from "./ProfileComponent";

const ProfileListStyle = css`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export type ProfileListType = {
  datas: PersonInfoType[] | ProfileType[] | null | undefined;
  person: number;
  handleProfileListContainer: (prev: any) => void;
  profileRef: RefObject<HTMLDivElement[]>;
};

export const ProfileList = ({ datas, person, handleProfileListContainer, profileRef }: ProfileListType) => {
  return (
    <div css={ProfileListStyle} aria-hidden="true" onClick={handleProfileListContainer}>
      {datas?.map((data, idx) => {
        const sex = person > 1 ? "team" : data.sex;
        return <ProfileComponent key={idx} sex={sex} data={data} profileRef={profileRef} idx={idx} />;
      })}
    </div>
  );
};
