import { RefObject } from "react";

export type ButtonType = {
  type?: string;
  color?: string;
};

export type ImageDivType = {
  type: string;
  image: string;
};

export type ChildrenType = {
  children?: JSX.Element | JSX.Element[];
};

export type InputLabelType = {
  label: string;
  placeholder?: string;
  refProps?: React.MutableRefObject<HTMLInputElement | null>;
};

export interface PersonInfoType {
  id: string;
  image: string;
  location: string;
  sex: string;
  age: number;
  info: string;
  gid?: number | null;
  idx?: number;
}
export interface PostTeamType {
  teamName: string;
  teamInfo: string;
  location: string;
}
export interface ChangeTeamInfoType extends PostTeamType {}

export type TeamInfoType = {
  image: string;
  id: string;
  info: string;
  location: string;
  age: number;
  sex: string;
  leader: string;
  member?: PersonInfoType[] | null;
};

export interface ProfileType extends PersonInfoType {
  member?: PersonInfoType[];
}

export type ProfileInfoDataType = {
  data: ProfileType;
};

export type ProfileListType = {
  datas: PersonInfoType[] | ProfileType[] | null | undefined;
  person: number;
  setOpenModal: (prev: any) => void;
  profileRef: RefObject<HTMLDivElement[]>;
};
export type RequestListType = {
  datas: RequestType[];
  type: string;
  setOpenModal: (prev: any) => void;
  profileRef: RefObject<HTMLDivElement[]>;
};

export type LargeModalType = {
  children: JSX.Element[];
  length: number;
  decreaseIndex: (e: React.MouseEvent<HTMLElement>) => void;
  inCreaseIndex: (e: React.MouseEvent<HTMLElement>) => void;
  index: number;
};

export type SmallModalType = {
  setRequest: (current: boolean) => void;
};

export type MessageType = {
  from: string;
  message: string;
  read: boolean;
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

export type RequestsType = {
  data: RequestType[];
};

export type joinChatType = {
  chatRoomId: number;
  notReadNum: number;
};

export type TeamImageContainerType = {
  image: string | ArrayBuffer | null;
};

export type ProfileImageType = {
  image: string | ArrayBuffer | null;
  type: string;
};

export type ChatProfileContainerType = {
  chatsInfo: ChatInfoType[] | null;
  setClickedRoomIndex: Function;
};

export type ProfileCardType = {
  type: string;
  children?: undefined | JSX.Element[] | JSX.Element | string;
};

export type ChatListInfoType = {
  lastChat: string;
  from: string;
};

export type ChatListContainerType = {
  profileRef: RefObject<HTMLDivElement[]>;
  setOpenModal: (prev: any) => void;
};

export type ChatImageContainerType = {
  profileRef: RefObject<HTMLDivElement[]>;
};

export type NavDropDownType = {
  DropDownList: Array<string>;
  className: string;
};

export type LinkButtonType = {
  url: string | undefined;
  type: string;
  content: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  refProps?: RefObject<HTMLDivElement>;
};

export type DropDownType = {
  DropDownRef?: RefObject<HTMLDivElement>;
  type: string;
  className: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  refProps?: RefObject<HTMLDivElement>;
};

export type menuType = {
  link?: string;
  name: string;
};
export type menuListType = {
  [key: string]: menuType[];
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

export type ReceiveRequestSocketType = {
  setRequest: Function;
  data: RequestType;
};

export type ReceiveDenySocketType = {
  setRequest: Function;
  data: { from: string; to: string };
};

export type ReceiveAcceptSocketType = {
  setRequest: Function;
  setJoinChat: Function;
  setChat: Function;
  data: {
    chat: ChatInfoType;
    from: string;
    to: string;
  };
};

export type ReceiveChatSocketType = {
  setJoinChat: any;
  setChat: any;
  setChatInfo: any;
  data: {
    message: MessageType;
    chatRoomId: number;
  };
};

export type IWebRTCUser = {
  id: string;
  email: string;
  stream: MediaStream;
};

export type webRTCProps = {
  email: string;
  stream: MediaStream;
  muted?: boolean;
};
