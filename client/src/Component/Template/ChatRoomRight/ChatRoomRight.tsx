import { css } from "@emotion/react";
import { Button } from "@Atom/.";
import { ChatRoomBasic } from "@Molecules/Chat/ChatRoomBasic/ChatRoomBasic";
import { ChatRoomFooter } from "@Molecules/Chat/ChatRoomFooter";
import { useHandleCloseRoom } from "./ChatRoomRight.hook";

const headerStyle = css`
  display: flex;
  justify-content: end;
  padding: 30px;
`;

export const ChatRoomRight = () => {
  const handleCloseRoomClick = useHandleCloseRoom();

  return (
    <div style={{ width: "100%" }}>
      <div css={headerStyle}>
        <Button size="Small" onClick={handleCloseRoomClick}>
          나가기
        </Button>
      </div>
      <ChatRoomBasic />
      <ChatRoomFooter />
    </div>
  );
};
