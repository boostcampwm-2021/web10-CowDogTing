import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { RequestType } from "@Util/type";

import { checkLogin, passToLoginPage } from "@Util/.";
import RequestListContainer from "../../Template/Request/RequestListContainer";
import { userState } from "@Recoil/UserData";
import { requestState } from "@Recoil/RequestData";

const RequestPageStyle = css`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
`;

export const RequestPage: React.FC = () => {
  if (!checkLogin()) passToLoginPage();

  const { id: myId, gid: mygId } = useRecoilValue(userState);
  const requestDatas = useRecoilValue(requestState);

  const [RequestForMe, setRequestForMe] = useState<RequestType[]>([]);
  const [RequestToMe, setRequestToMe] = useState<RequestType[]>([]);

  const getDatas = () => {
    setRequestForMe(
      requestDatas.filter((data: RequestType) => {
        if (data == null) return false;
        if (!data.info.member) {
          return data?.from !== myId;
        }
        return Number(data.to) === mygId;
      })
    );
    setRequestToMe(
      requestDatas.filter((data: RequestType) => {
        if (data == null) return false;
        if (!data.info.member) {
          return data?.from === myId;
        }
        return Number(data.to) !== mygId;
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
};
