import { Socket } from "socket.io-client";
import ClientSocket from ".";
import { IWebRTCUser } from "../util/type";
import { createReceivePC } from "./webRTC";

const socket = ClientSocket.instance.socket as Socket;
const { sendPC, receivePCs } = ClientSocket;

export const userEnterEvent = (data: { id: string }, chatRoomId: string) => {
  createReceivePC(data.id, socket, chatRoomId);
};

export const allUsersEvent = (data: { users: Array<{ id: string }> }, chatRoomId: string) => {
  data.users.forEach((user) => createReceivePC(user.id, socket, chatRoomId));
};

export const userExitEvent = (data: { id: string }, setUsers: Function) => {
  receivePCs[data.id].close();
  delete receivePCs[data.id];
  setUsers((prev: IWebRTCUser[]) => prev.filter((user) => user.id !== data.id));
};

export const getSenderAnswerEvent = async (data: { sdp: RTCSessionDescription }) => {
  try {
    await sendPC.setRemoteDescription(new RTCSessionDescription(data.sdp));
  } catch (error) {
    console.log(error);
  }
};

export const getSenderCandidatEvent = async (data: { candidate: RTCIceCandidateInit }) => {
  try {
    if (!data.candidate) return;
    sendPC.addIceCandidate(new RTCIceCandidate(data.candidate));
  } catch (error) {
    console.log(error);
  }
};

export const getReceiverAnswerEvent = async (data: { id: string; sdp: RTCSessionDescription }) => {
  try {
    const pc: RTCPeerConnection = receivePCs[data.id];
    await pc.setRemoteDescription(data.sdp);
  } catch (error) {
    console.log(error);
  }
};

export const getReceiverCandidateEvent = async (data: { id: string; candidate: RTCIceCandidateInit }) => {
  try {
    const pc: RTCPeerConnection = receivePCs[data.id];
    if (!data.candidate) return;
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  } catch (error) {
    console.log(error);
  }
};
