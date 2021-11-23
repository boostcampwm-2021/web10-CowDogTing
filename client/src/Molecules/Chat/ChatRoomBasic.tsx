/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */

import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
// import { Socket } from "socket.io-client";
import { css } from "@emotion/react";
import Video from "../Atom/Video";
import ClientSocket from "../Socket";
import { allUsersEvent, getReceiverAnswerEvent, getReceiverCandidateEvent, getSenderAnswerEvent, getSenderCandidateEvent, userEnterEvent, userExitEvent } from "../Socket/util";
import { IWebRTCUser } from "../util/type";
import { chatTarget, userState } from "../Recoil/Atom";
import { getLocalStream } from "../Socket/webRTC";
import { Button } from "../Atom/Button";

// const GameVideoStyle = css`
//   top: -10%;
//   width: 150px;
//   height: 150px;
// `;

// const GatherVideoStyle = css`
//   width: 150px;
//   height: 150px;
// `;

// const videoStyle = (props: { type: string }) => css`
//   width: 240px;
//   height: 240px;
//   border: 1px solid #000000;
//   ${props.type === "Game" && GameVideoStyle}
//   ${props.type === "Gather" && GatherVideoStyle}
// `;

const GameStyle = css`
  top: 0%;
  width: 630px;
  height: 150px;
  overflow-x: scroll;
  flex-direction: column;
`;

const GatherStyle = css`
  top: 0%;
  width: 560px;
  height: 150px;
`;

const containerStyle = (props: { type: string }) => css`
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
  ${props.type === "Game" && GameStyle}
  ${props.type === "Gather" && GatherStyle}
`;

export default function ChatRoomBasic({ type }: { type: string }) {
  const { chatRoomId } = useRecoilValue(chatTarget);
  const { id } = useRecoilValue(userState);
  const [users, setUsers] = useState<Array<IWebRTCUser>>([]);
  // const videoRef = useRef<HTMLDivElement>();
  const localStreamRef = useRef<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const { socket } = new ClientSocket(id);
  const handleUserExitEvent = (socketId: string) => {
    userExitEvent(socketId, setUsers);
  };

  const handleAllUserEvent = (data: { users: Array<{ id: string }> }) => {
    if (!socket) return;
    allUsersEvent(data, String(chatRoomId), socket, setUsers);
  };

  const handleUserEnterEvent = (data: { id: string }) => {
    if (!socket) return;
    userEnterEvent(data, String(chatRoomId), socket, setUsers);
  };

  /* eslint consistent-return: "error" */

  useEffect(() => {
    getLocalStream(localStreamRef, localVideoRef, setUsers, String(chatRoomId), socket);
    socket!.on("userEnter", handleUserEnterEvent);
    socket!.on("allUsers", handleAllUserEvent);
    socket!.on("userExit", handleUserExitEvent);
    socket!.on("getSenderAnswer", getSenderAnswerEvent);
    socket!.on("getSenderCandidate", getSenderCandidateEvent);
    socket!.on("getReceiverAnswer", getReceiverAnswerEvent);
    socket!.on("getReceiverCandidate", getReceiverCandidateEvent);
    return () => {
      const { sendPC } = ClientSocket;
      if (sendPC) sendPC.close();
      users.forEach((user) => handleUserExitEvent(user.id));
      socket!.emit("leaveRoom");
      socket!.off("userEnter", handleUserEnterEvent);
      socket!.off("allUsers", handleAllUserEvent);
      socket!.off("userExit", handleUserExitEvent);
      socket!.off("getSenderAnswer", getSenderAnswerEvent);
      socket!.off("getSenderCandidate", getSenderCandidateEvent);
      socket!.off("getReceiverAnswer", getReceiverAnswerEvent);
      socket!.off("getReceiverCandidate", getReceiverCandidateEvent);
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const getPcStats = async (pc: RTCPeerConnection) => {
    const data = await pc.getStats();
    console.log(data);
  };

  useEffect(() => {
    const { sendPC } = ClientSocket;
    console.log(sendPC);
    if (!sendPC) return;
    getPcStats(sendPC);
  }, [users]);
  // useEffect(() => {
  //   return () => {
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //     if (localVideoRef.current) {
  //       localVideoRef.current.close();
  //     }
  //     users.forEach((user) => handleUserExitEvent(user.id));
  //   };
  // })
  function muteMic() {
    if (!localStreamRef || !localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach((track: MediaStreamTrack) => {
      track.enabled = !track.enabled;
    });
  }

  function muteCam() {
    if (!localStreamRef || !localStreamRef.current) return;
    localStreamRef.current.getVideoTracks().forEach((track: MediaStreamTrack) => {
      track.enabled = !track.enabled;
    });
  }
  return (
    <div>
      <div css={containerStyle({ type })}>
        {/* <video css={videoStyle({ type })} muted ref={localVideoRef} autoPlay />
        <video css={videoStyle({ type })} muted ref={localVideoRef} autoPlay />
        <video css={videoStyle({ type })} muted ref={localVideoRef} autoPlay />
        <video css={videoStyle({ type })} muted ref={localVideoRef} autoPlay />
        <video css={videoStyle({ type })} muted ref={localVideoRef} autoPlay /> */}
        {users?.map((user) => {
          console.log(user);
          return <Video stream={user.stream} key={user.id} type={type} />;
        })}
      </div>
      <Button type="Small" onClick={muteCam}>
        cam On/Off
      </Button>
      <Button type="Small" onClick={muteMic}>
        mic On/Off
      </Button>
    </div>
  );
}
