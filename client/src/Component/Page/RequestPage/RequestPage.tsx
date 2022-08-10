import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { RequestType } from "@Common/type";
import { userState } from "@Recoil/UserData";
import { requestForMeSelector, requestState, requestToMeSelector } from "@Recoil/RequestData";
import RequestListContainer from "@Template/Request/RequestListContainer";

const RequestPageStyle = css`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
`;

export const RequestPage: React.FC = () => {
  const RequestForMe = useRecoilValue(requestForMeSelector);
  const RequestToMe = useRecoilValue(requestToMeSelector);

  return (
    <div css={RequestPageStyle}>
      <RequestListContainer type="ForMe" datas={RequestForMe} />
      <RequestListContainer type="ToMe" datas={RequestToMe} />
    </div>
  );
};
