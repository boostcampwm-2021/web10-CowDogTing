import React, { useEffect, useRef } from "react";
import { IWebRTCUser } from "@Util/type";
import ClientSocket from "@Socket/.";
import { getSenderAnswerEvent, getSenderCandidateEvent, getReceiverAnswerEvent, getReceiverCandidateEvent, allUsersEvent, userEnterEvent, userExitEvent } from "@Socket/util";
import { getLocalStream } from "@Socket/webRTC";

type userType = {
  users: IWebRTCUser[];
  setUsers: React.Dispatch<React.SetStateAction<IWebRTCUser[]>>;
};

export const useVideoSocketEvent = ({ id, chatRoomId, userState }: { id: string; chatRoomId: number; userState: userType }) => {
  const { socket } = new ClientSocket(id);
  const { users, setUsers } = userState;
  const localStreamRef = useRef<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const handleUserExitEvent = (socketId: string) => userExitEvent(socketId, setUsers);
  const handleAllUserEvent = (data: { users: Array<{ id: string }> }) => allUsersEvent(data, String(chatRoomId), socket, setUsers);
  const handleUserEnterEvent = (data: { id: string }) => userEnterEvent(data, String(chatRoomId), socket, setUsers);

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

  return { localStreamRef, localVideoRef };
};
