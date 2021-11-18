/* eslint-disable no-nested-ternary */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import ChatRoomBasic from "../Molecules/ChatRoomBasic";
import ChatRoomGame from "../Molecules/ChatRoomGame";
import ChatRoomGather from "./ChatRoomGather";
import ChatRoomFooter from "../Molecules/ChatRoomFooter";
import { checkGameInUrl, checkGatherInUrl } from "../util";

const headerStyle = css`
  display: flex;
  justify-content: end;
  padding: 30px;
`;

export default function ChatRoomRight() {
  const [roomType, setRoomType] = useState("Basic");

  const history = useHistory();

  const handleCloseRoomClick = () => {
    history.goBack();
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
        <Route path="/ChatRoom/Gather" component={ChatRoomGather} />
      </Switch>
      {roomType === "Basic" && <ChatRoomFooter />}
    </div>
  );
}
