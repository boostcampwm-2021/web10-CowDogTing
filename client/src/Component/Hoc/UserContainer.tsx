import React from "react";
import { css } from "@emotion/react";
import { ProfileInfo, ProfileCard } from "@Atom/.";
import { PersonInfoType, ProfileType } from "@Util/type";

const ProfileStyle = css`
  max-height: 200px;
  margin: 30px 0px;
`;

type props = { sex: string; data: PersonInfoType | ProfileType; profileRef: React.RefObject<HTMLDivElement[]>; idx: number; children?: JSX.Element | undefined };

export const UserContainer: React.FC<props> = ({ sex, data, profileRef, idx, children }) => {
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
};

UserContainer.defaultProps = {
  children: undefined,
};
