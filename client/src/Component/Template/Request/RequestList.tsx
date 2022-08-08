/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { RequestListType } from "../../../util/type";
import { handleModalClick } from "../../../util";
import RequestComponent from "./RequestComponent";

const ProfileListStyle = css`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
  height: 100vh;
`;

export default function RequestList({ datas, setOpenModal, type, profileRef }: RequestListType) {
  return (
    <div css={ProfileListStyle} onClick={(e) => handleModalClick(e, profileRef, setOpenModal)}>
      {datas?.map((data, idx): React.ReactElement | undefined => {
        return <RequestComponent data={data} type={type} profileRef={profileRef} idx={idx} />;
      })}
    </div>
  );
}
