/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import { PersonInfoType, ProfileType } from "../util/type";

const ProfileStyle = css`
  max-height: 200px;
  margin: 30px 0px;
`;

export default function UserContainer({ sex, data, profileRef, idx, children }: { sex: string; data: PersonInfoType | ProfileType; profileRef: React.RefObject<HTMLDivElement[]>; idx: number; children?: JSX.Element | undefined }) {
  return (
    <div css={ProfileStyle}>
      <div ref={(el) => ((profileRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)} data-id={idx}>
        <ProfileCard type={sex}>
          <ProfileInfo data={data} />
        </ProfileCard>
      </div>
      {children}
    </div>
  );
}

UserContainer.defaultProps = {
  children: undefined,
};
