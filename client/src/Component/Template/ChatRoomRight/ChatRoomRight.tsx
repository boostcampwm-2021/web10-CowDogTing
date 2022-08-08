/* eslint-disable no-nested-ternary */
/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { css } from "@emotion/react";
import { Button } from "../../Atom/Button";
import { checkGameInUrl, checkGatherInUrl } from "../../../util";
import ChatRoomBasic from "../../Molecules/Chat/ChatRoomBasic";
import ChatRoomFooter from "../../Molecules/Chat/ChatRoomFooter";
import ChatRoomGame from "../../Molecules/Chat/ChatRoomGame";
import { useHandleCloseRoom } from "./ChatRoomRight.hook";

const headerStyle = css`
  display: flex;
  justify-content: end;
  padding: 30px;
`;

export const ChatRoomRight = () => {
  const roomType = useMemo(() => (checkGameInUrl() ? "Game" : checkGatherInUrl() ? "Gather" : "Basic"), []);
  const handleCloseRoomClick = useHandleCloseRoom();

  return (
    <div style={{ width: "100%" }}>
      <div css={headerStyle}>
        <Button type="Small" onClick={handleCloseRoomClick}>
          나가기
        </Button>
      </div>
      <ChatRoomBasic type={roomType} />
      <Routes>
        <Route path="/ChatRoom/Game" element={<ChatRoomGame />} />
      </Routes>
      {roomType === "Basic" && <ChatRoomFooter />}
    </div>
  );
};
