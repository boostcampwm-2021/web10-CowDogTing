/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { RequestType } from "../util/type";
import { requestState, userState } from "../Recoil/Atom";
import { checkLogin, passToLoginPage } from "../util";
import RequestListContainer from "../Template/RequestListContainer";

const RequestPageStyle = css`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
`;

export default function RequestPage() {
  const { id: myId } = useRecoilValue(userState);
  const requestDatas = useRecoilValue(requestState);

  const [RequestForMe, setRequestForMe] = useState<RequestType[]>([]);
  const [RequestToMe, setRequestToMe] = useState<RequestType[]>([]);
  const userInfo = useRecoilValue(userState);
  if (!checkLogin(userInfo)) passToLoginPage();

  const getDatas = () => {
    setRequestForMe(
      requestDatas.filter((data: RequestType) => {
        if (data == null) return false;
        return data?.from !== myId;
      })
    );
    setRequestToMe(
      requestDatas.filter((data: RequestType) => {
        if (data == null) return false;
        return data.from === myId;
      })
    );
  };

  useEffect(() => {
    getDatas();
  }, [requestDatas]);

  return (
    <div css={RequestPageStyle}>
      <RequestListContainer type="ForMe" datas={RequestForMe} />
      <RequestListContainer type="ToMe" datas={RequestToMe} />
    </div>
  );
}
