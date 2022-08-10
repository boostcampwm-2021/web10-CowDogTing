import React from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { userState } from "@Recoil/UserData";
import { Button } from "@Atom/.";
import { RequestType } from "../../../Util/type";
import { requestAccept, requestDeny } from "../../../Util/data";

export type RequestButtonProps = { type: string; data: RequestType; isTeam: string };
export const RequestButton = ({ type, data, isTeam }: RequestButtonProps) => {
  const { from, state } = data;
  const { id: myId, gid: mygId } = useRecoilValue(userState);
  const toId = isTeam === "team" && mygId ? mygId : myId;

  const handleAcceptClick = () => requestAccept({ from, to: toId });
  const handleDenyClick = () => requestDeny({ from, to: toId });

  if (type === "ForMe") {
    return (
      <>
        <Button size="small" onClick={handleAcceptClick}>
          수락
        </Button>
        <Button size="small" onClick={handleDenyClick}>
          거절
        </Button>
      </>
    );
  }
  return <div css={StateStyle}>{state}</div>;
};

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
