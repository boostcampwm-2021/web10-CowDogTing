import React, { RefObject } from "react";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ProfileImage, Button } from "@Atom/.";
import { useMovePage } from "@Hook/useMovePage";
import { getChatMemberSelector } from "@Recoil/Atom";

type ChatImageContainerType = {
  profileRef: RefObject<HTMLDivElement[]>;
};

export const ChatImageContainer = ({ profileRef }: ChatImageContainerType) => {
  const member = useRecoilValue(getChatMemberSelector);
  const [handleCloseRoomClick] = useMovePage("/main");

  return (
    <ChatListHeader>
      <div css={ChatImageContainerStyle}>
        {member?.map((userInfo, idx) => (
          <ProfileImage key={idx} type="Mini" image={userInfo.image} ref={(el: any) => ((profileRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)} data-id={idx} />
        ))}
      </div>
      <Button onClick={handleCloseRoomClick}>나가기</Button>
    </ChatListHeader>
  );
};

const ChatListHeader = styled.div`
  display: flex;
  width: 100%;
  height: 5vw;
  border-bottom: 1px solid;
  align-items: center;
  min-height: 60px;
  padding-right: 10px;
  min-width: 520px;
`;

const ChatImageContainerStyle = css`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
