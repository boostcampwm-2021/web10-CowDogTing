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
};

export type PersonInfoType = {
  id: string;
  image: string;
  location: string;
  sex: string;
  age: number;
  info: string;
};

export type TeamInfoType = {
  image: string;
  id: string;
  info: string;
  location: string;
  age: number;
  sex: string;
  member?: PersonInfoType[] | null;
};

export type ProfileType = {
  id: string;
  image: string;
  location: string;
  sex: string;
  age: number;
  info: string;
  member?: PersonInfoType[];
};

export type ProfileInfoDataType = {
  data: ProfileType;
  idx?: number;
};

export type ProfileListType = {
  datas?: PersonInfoType[] | null | ProfileType[];
  person: number;
  setOpenModal: (prev: any) => void;
};

export type LargeModalType = {
  children: JSX.Element[];
  datas: ProfileType[] | String[] | null;
  decreaseIndex: (e: React.MouseEvent<HTMLElement>) => void;
  inCreaseIndex: (e: React.MouseEvent<HTMLElement>) => void;
  index: number;
};

export type SmallModalType = {
  data: ProfileType;
  setRequest: (current: boolean) => void;
};

export type MessageType = {
  from: string;
  message: string;
  read: boolean;
  source: string;
};

export type ChatInfoType = {
  chatRoomID: number;
  member: PersonInfoType[];
  chatMessage: MessageType[];
};

export type ChatsInfoType = {
  data: ChatInfoType[];
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
  chatRoomID: number;
  notReadNum: number;
};
export type JoinChatsType = {
  joinChatRooms: joinChatType[];
};
export type TeamImageContainerType = {
  image: string | ArrayBuffer | null;
};

export type ProfileImageType = {
  image: string | ArrayBuffer | null;
  type: string;
};
