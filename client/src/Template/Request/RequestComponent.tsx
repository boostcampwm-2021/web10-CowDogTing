/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import RequestButton from "../../Atom/RequestButton";
import { RequestType } from "../../util/type";
import UserContainer from "../../Container/UserContainer";

const ProfileSideStyle = css`
  display: flex;
  height: 60%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
`;

export default function RequestComponent({ data, type, ref, idx }: { data: RequestType; type: string; ref: React.RefObject<HTMLDivElement[]>; idx: number }) {
  return (
    <UserContainer sex={data.info.sex} data={data.info} ref={ref} idx={idx}>
      <div css={ProfileSideStyle}>
        <RequestButton type={type} data={data} />
      </div>
    </UserContainer>
  );
}
