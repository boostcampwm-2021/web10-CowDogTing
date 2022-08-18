import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
// import { Socket } from "socket.io-client";
import { css } from "@emotion/react";
import { Video, Button } from "@Atom/.";
import { IWebRTCUser } from "@Common/type";
import { userChatRoomInfo } from "@Recoil/ChatData";
import ClientSocket from "../../../../Socket";
import { useVideoSocketEvent } from "./ChatRoomBasic.hook";

export const ChatRoomBasic = () => {
  const { chatRoomId, id } = useRecoilValue(userChatRoomInfo);
  const [users, setUsers] = useState<IWebRTCUser[]>([]);
  const { localStreamRef, localVideoRef } = useVideoSocketEvent({ id, chatRoomId, userState: { users, setUsers } });
  const muteMicCam = () => localStreamRef.current?.getAudioTracks().forEach((track: MediaStreamTrack) => (track.enabled = !track.enabled));

  useEffect(() => {
    ClientSocket.sendPC.getStats();
  }, [users]);

  return (
    <div>
      <div css={containerStyle}>
        <video css={videoStyle} muted ref={localVideoRef} autoPlay />
        {users?.map((user) => (
          <Video stream={user.stream} key={user.id} />
        ))}
      </div>
      <div css={buttonContainerStyle}>
        <Button size="Small" onClick={muteMicCam}>
          cam On/Off
        </Button>
        <Button size="Small" onClick={muteMicCam}>
          mic On/Off
        </Button>
      </div>
    </div>
  );
};

const videoStyle = css`
  width: 240px;
  height: 240px;
  border: 1px solid #000000;
`;

const containerStyle = css`
  margin: 0 auto;
  width: 520px;
  height: 520px;
  overflow-y: scroll;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  padding: 30px;
  padding-top: 0;
  position: relative;
`;

const buttonContainerStyle = css`
  display: flex;
  margin-left: 1vw;
  position: absolute;
  top: 83.5%;
`;
