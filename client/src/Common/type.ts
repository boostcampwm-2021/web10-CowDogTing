import React from "react";

export type ChildrenType = {
  children?: React.ReactNode;
};

export type PersonInfoType = {
  [key: string]: string | number | undefined | null | PersonInfoType[];
  id: string;
  image: string | null;
  location: string;
  sex: string;
  age: number;
  info: string;
  gid?: number | null;
  idx?: number;
};

export type TeamInfoType = {
  image: string | null;
  id: string;
  info: string;
  location: string;
  age: number;
  sex: string;
  leader: string;
  member?: PersonInfoType[] | null;
};

export type ProfileType = PersonInfoType & {
  member?: PersonInfoType[];
};

export type RequestListType = {
  datas: RequestType[];
  type: string;
  handleRequestListContainer: (prev: any) => void;
  profileRef: React.RefObject<HTMLDivElement[]>;
};

export type MessageType = {
  from: string;
  message: string;
  source: string;
};

export type ChatInfoType = {
  chatRoomId: number;
  member: PersonInfoType[];
  chatMessage: MessageType[];
};

export type RequestType = {
  from: string;
  to: string;
  info: ProfileType;
  state: string;
};

export type joinChatType = {
  chatRoomId: number;
  notReadNum: number;
};

export type ProfileCardType = {
  type: string;
  children?: undefined | JSX.Element[] | JSX.Element | string;
};

export interface loginInfo {
  id: string;
  pw: string;
}

export interface registerInfo extends loginInfo {
  location: string;
  age: number;
  sex: string;
  info: string;
}

export type ErrorType = {
  errorStr: string;
  timeOut: number;
};

export type IWebRTCUser = {
  id: string;
  stream: MediaStream;
};

// export type webRTCProps = {
//   stream: MediaStream;
//   muted?: boolean;
// };

// export type receivePCsType = {
//   id: string;
//   pc: RTCPeerConnection;
// };
