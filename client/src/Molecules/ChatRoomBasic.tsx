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

const GameStyle = css`
  top: -10%;
`;

const GatherStyle = css``;

const containerStyle = (props: { type: string }) => css`
  height: 50%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 30px;
  padding-top: 0;
  position: absolute;
  left: 50%;
  ${props.type === "Game" && GameStyle}
  ${props.type === "Gather" && GatherStyle}
`;

export default function ChatRoomBasic({ type }: { type: string }) {
  const { chatRoomId } = useRecoilValue(chatTarget);
  const { id } = useRecoilValue(userState);
  const [users, setUsers] = useState<Array<IWebRTCUser>>([]);

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
      socket!.off("userEnter", handleUserEnterEvent);
      socket!.off("allUsers", handleAllUserEvent);
      socket!.off("userExit", handleUserExitEvent);
      socket!.off("getSenderAnswer", getSenderAnswerEvent);
      socket!.off("getSenderCandidate", getSenderCandidateEvent);
      socket!.off("getReceiverAnswer", getReceiverAnswerEvent);
      socket!.off("getReceiverCandidate", getReceiverCandidateEvent);
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

  return (
    <div css={containerStyle({ type })}>
      <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        muted
        ref={localVideoRef}
        autoPlay
      />
      {users?.map((user) => {
        console.log(user);
        return <Video stream={user.stream} key={user.id} type={type} />;
      })}
    </div>
  );
}
