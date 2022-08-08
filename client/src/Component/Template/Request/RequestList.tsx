import React from "react";
import { css } from "@emotion/react";
import { RequestListType } from "../../../Util/type";
import { handleModalClick } from "../../../Util";
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

export default function RequestList({ datas, handleRequestListContainer, type, profileRef }: RequestListType) {
  return (
    <div css={ProfileListStyle} aria-hidden="true" onClick={handleRequestListContainer}>
      {datas?.map((data, idx): React.ReactElement | undefined => {
        return <RequestComponent key={idx} data={data} type={type} profileRef={profileRef} idx={idx} />;
      })}
    </div>
  );
}
