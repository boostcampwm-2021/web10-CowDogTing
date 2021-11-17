/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import { RequestListType } from "../util/type";
import RequestButton from "../Atom/RequestButton";
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
const ProfileSideStyle = css`
  display: flex;
  height: 60%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
`;
const ProfileStyle = css`
  display: flex;
  align-items: center;
  max-height: 200px;
  margin: 30px 0px;
`;

export default function RequestList({ datas, setOpenModal, type, profileRef }: RequestListType) {
  return (
    <div css={ProfileListStyle} onClick={(e) => handleModalClick(e, profileRef, setOpenModal)}>
      {datas?.map((data, idx): React.ReactElement | undefined => {
        const { sex } = data.info;
        return (
          <div css={ProfileStyle}>
            <div ref={(el) => ((profileRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)} data-id={idx}>
              <ProfileCard type={sex}>
                <ProfileInfo data={data.info} />
              </ProfileCard>
            </div>
            <div css={ProfileSideStyle}>
              <RequestButton type={type} data={data} />
            </div>
          </div>
        );
      })}
      <div css={ProfileStyle} /> {/* css용으로 넣어둠... 갑자기 이상하게 보여서..나는.. 디자이너가 아닌데... */}
    </div>
  );
}
