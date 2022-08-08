/* eslint-disable no-console */

import React from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { Button } from "./Button";
import { RequestType } from "../../Util/type";
import { requestAccept, requestDeny } from "../../Util/data";
import { userState } from "../../Recoil/Atom";

const StateStyle = css`
  width: 130px;
  height: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  cursor: default;
  border: 2px solid #ffcfcf;
`;

export default function RequestButton({ type, data, isTeam }: { type: string; data: RequestType; isTeam: string }) {
  const { id: myId, gid: mygId } = useRecoilValue(userState);
  let toId: number | string = myId;
  if (isTeam === "team" && mygId) {
    toId = mygId;
  }
  const { from } = data;

  const handleAcceptClick = () => {
    requestAccept({ from, to: toId });
  };

  const handleDenyClick = () => {
    requestDeny({ from, to: toId });
  };

  const { state } = data;

  if (type === "ForMe") {
    return (
      <>
        <Button type="small" onClick={handleAcceptClick}>
          수락
        </Button>
        <Button type="small" onClick={handleDenyClick}>
          거절
        </Button>
      </>
    );
  }
  return <div css={StateStyle}>{state}</div>;
}
