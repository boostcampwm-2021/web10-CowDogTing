/* eslint-disable no-console */
import { Socket } from "socket.io-client";
import ClientSocket from ".";
import { IWebRTCUser } from "../Util/type";
import { createReceivePC } from "./webRTC";

// const socket = ClientSocket.instance.socket as Socket;

export const userEnterEvent = (data: { id: string }, chatRoomId: string, socket: Socket, setUsers: Function) => {
  if (data.id === ClientSocket?.instance?.socket?.id) return;
  createReceivePC(data.id, socket, chatRoomId, setUsers);
};

export const allUsersEvent = (data: { users: Array<{ id: string }> }, chatRoomId: string, socket: Socket, setUsers: Function) => {
  data.users.forEach((user) => createReceivePC(user.id, socket, chatRoomId, setUsers));
};

export const userExitEvent = (socketId: string, setUsers: Function) => {
  const { receivePCs } = ClientSocket;
  if (!receivePCs[socketId]) receivePCs[socketId].close();
  delete receivePCs[socketId];
  setUsers((prev: IWebRTCUser[]) => prev.filter((user) => user.id !== socketId));
};

export const getSenderAnswerEvent = async (data: { sdp: RTCSessionDescription }) => {
  const { sendPC } = ClientSocket;
  try {
    await sendPC.setRemoteDescription(new RTCSessionDescription(data.sdp));
  } catch (error) {
    console.log(error);
  }
};

export const getSenderCandidateEvent = async (data: { candidate: RTCIceCandidateInit }) => {
  const { sendPC } = ClientSocket;
  try {
    if (!data.candidate) return;
    sendPC.addIceCandidate(new RTCIceCandidate(data.candidate));
  } catch (error) {
    console.log(error);
  }
};

export const getReceiverAnswerEvent = async (data: { id: string; sdp: RTCSessionDescription }) => {
  try {
    const { receivePCs } = ClientSocket;
    const pc: RTCPeerConnection = receivePCs[data.id];
    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
  } catch (error) {
    console.log(error);
  }
};

export const getReceiverCandidateEvent = async (data: { id: string; candidate: RTCIceCandidateInit }) => {
  const { receivePCs } = ClientSocket;
  try {
    const pc: RTCPeerConnection = receivePCs[data.id];
    if (!data.candidate) return;
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  } catch (error) {
    console.log(error);
  }
};
