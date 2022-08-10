import React from "react";
import { css } from "@emotion/react";
import { RequestButton } from "@Atom/.";
import { RequestType } from "@Util/type";
import { UserContainer } from "@Hoc/.";

const ProfileSideStyle = css`
  display: flex;
  margin-top: 30px;
  height: 40%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
`;
const ProfileStyle = css`
  display: flex;
  height: 60%;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
`;

export default function RequestComponent({ data, type, profileRef, idx }: { data: RequestType; type: string; profileRef: React.RefObject<HTMLDivElement[]>; idx: number }) {
  const sex = data.info?.member ? "team" : data.info.sex;
  return (
    <div css={ProfileStyle}>
      <UserContainer sex={data.info.sex} data={data.info} profileRef={profileRef} idx={idx} />
      <div css={ProfileSideStyle}>
        <RequestButton type={type} data={data} isTeam={sex} />
      </div>
    </div>
  );
}
