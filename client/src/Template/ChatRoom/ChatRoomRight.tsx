/* eslint-disable no-nested-ternary */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { Button } from "../../Atom/Button";
import { checkGameInUrl, checkGatherInUrl } from "../../util";
import ChatRoomBasic from "../../Molecules/Chat/ChatRoomBasic";
import ChatRoomFooter from "../../Molecules/Chat/ChatRoomFooter";
import ChatRoomGame from "../../Molecules/Chat/ChatRoomGame";
import { chatTarget } from "../../Recoil/Atom";

const headerStyle = css`
  display: flex;
  justify-content: end;
  padding: 30px;
`;

export default function ChatRoomRight() {
  const [roomType, setRoomType] = useState("Basic");
  const { chatRoomId } = useRecoilValue(chatTarget);
  const searchParams = new URLSearchParams(useLocation().search);
  const history = useHistory();

  const handleCloseRoomClick = () => {
    const isGameIn = Number(searchParams.get("index"));
    if (!isGameIn) history.push("/sub/chatList");
    else history.push(`/ChatRoom?chatRoomId=${chatRoomId}`);
  };

  useEffect(() => {
    const type = checkGameInUrl() ? "Game" : checkGatherInUrl() ? "Gather" : "Basic";
    setRoomType(type);
  });

  return (
    <div style={{ width: "100%" }}>
      <div css={headerStyle}>
        <Button type="Small" onClick={handleCloseRoomClick}>
          나가기
        </Button>
      </div>
      <ChatRoomBasic type={roomType} />
      <Switch>
        <Route path="/ChatRoom/Game" component={ChatRoomGame} />
      </Switch>
      {roomType === "Basic" && <ChatRoomFooter />}
    </div>
  );
}
