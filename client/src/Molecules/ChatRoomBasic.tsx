/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Socket } from "socket.io-client";
import { css } from "@emotion/react";
import Video from "../Atom/Video";
import ClientSocket from "../Socket";
import { allUsersEvent, getReceiverAnswerEvent, getReceiverCandidateEvent, getSenderAnswerEvent, getSenderCandidatEvent, userEnterEvent, userExitEvent } from "../Socket/util";
import { IWebRTCUser } from "../util/type";
import { chatTarget } from "../Recoil/Atom";
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
  const [users, setUsers] = useState<Array<IWebRTCUser>>([]);

  const localStreamRef = useRef<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const socket = ClientSocket.instance.socket as Socket;

  const handleUserExitEvent = (data: { id: string }) => {
    userExitEvent(data, setUsers);
  };

  const handleAllUserEvent = (data: { users: Array<{ id: string }> }) => {
    allUsersEvent(data, String(chatRoomId));
  };

  const handleUserEnterEnvet = (data: { id: string }) => {
    userEnterEvent(data, String(chatRoomId));
  };

  useEffect(() => {
    getLocalStream(localStreamRef, localVideoRef, setUsers, String(chatRoomId));
    socket.on("userEnter", handleUserEnterEnvet);
    socket.on("allUsers", handleAllUserEvent);
    socket.on("userExit", handleUserExitEvent);
    socket.on("getSenderAnswer", getSenderAnswerEvent);
    socket.on("getSenderCandidate", getSenderCandidatEvent);
    socket.on("getReceiverAnswer", getReceiverAnswerEvent);
    socket.on("getReceiverCandidate", getReceiverCandidateEvent);
    return () => {
      socket.off("userEnter", handleUserEnterEnvet);
      socket.off("allUsers", handleAllUserEvent);
      socket.off("userExit", handleUserExitEvent);
      socket.off("getSenderAnswer", getSenderAnswerEvent);
      socket.off("getSenderCandidate", getSenderCandidatEvent);
      socket.off("getReceiverAnswer", getReceiverAnswerEvent);
      socket.off("getReceiverCandidate", getReceiverCandidateEvent);
    };
  });

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
      {users?.map((user) => (
        <Video stream={user.stream} key={user.id} type={type} />
      ))}
    </div>
  );
}
