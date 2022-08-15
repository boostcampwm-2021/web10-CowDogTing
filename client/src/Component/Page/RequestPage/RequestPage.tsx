import React from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { requestForMeSelector, requestToMeSelector } from "@Recoil/RequestData";
import { RequestListContainer } from "@Template/.";

const RequestPageStyle = css`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
`;

export const RequestPage: React.FC = () => {
  const RequestForMe = useRecoilValue(requestForMeSelector(0));
  const RequestToMe = useRecoilValue(requestToMeSelector(0));

  return (
    <div css={RequestPageStyle}>
      <RequestListContainer type="ForMe" datas={RequestForMe} />
      <RequestListContainer type="ToMe" datas={RequestToMe} />
    </div>
  );
};
