import { css } from "@emotion/react";
import { Button } from "@Atom/.";
import { ChatRoomBasic } from "@Molecules/Chat/ChatRoomBasic/ChatRoomBasic";
import { VideoSupport } from "@Molecules/Chat/VideoSupport";
import { useHandleCloseRoom } from "./ChatRoomRight.hook";

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
      <div css={footerStyle}>
        <VideoSupport />
      </div>
    </div>
  );
};

const headerStyle = css`
  display: flex;
  justify-content: end;
  padding: 30px;
`;
const footerStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 50px;
  position: absolute;
  bottom: 10%;
  right: 5%;
`;
