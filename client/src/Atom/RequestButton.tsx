/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { Button } from "./Button";
import { RequestType } from "../util/type";
import { requestAccept, requestDeny } from "../util";
import { requestState } from "../Recoil/Atom";

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

export default function RequestButton({ type, data }: { type: string; data: RequestType }) {
  const setRequestData = useSetRecoilState(requestState);

  const handleAcceptClick = () => {
    console.log("수락");
    const {
      info: { id },
    } = data;
    requestAccept(id);
    setRequestData((prev) => {
      return prev.filter((item) => item.from !== id);
    });
  };

  const handleDenyClick = () => {
    console.log("거절");
    const {
      info: { id },
    } = data;
    requestDeny(id);
    setRequestData((prev) => {
      return prev.filter((item) => item.from !== id);
    });
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
