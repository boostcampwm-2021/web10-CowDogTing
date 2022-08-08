import { atom } from "recoil";
import { ChatInfoType, ErrorType, joinChatType, PersonInfoType, ProfileType, RequestType, TeamInfoType } from "../Util/type";

export const cowDogState = atom<ProfileType[]>({
  key: "cowDogState",
  default: [],
});

export const requestTarget = atom<ProfileType>({
  key: "requestTarget",
  default: {
    id: "",
    image: null,
    location: "",
    sex: "",
    age: 0,
    info: "",
    gid: null,
    idx: 0,
  },
});

export const profileModalDatas = atom<ProfileType[]>({
  key: "profileModalDatas",
  default: [],
});

export const chatTarget = atom<ChatInfoType>({
  key: "chatTargets",
  default: {
    chatRoomId: 0,
    member: [],
    chatMessage: [],
  },
});

export const errorState = atom<ErrorType>({
  key: "errorState",
  default: {
    errorStr: "",
    timeOut: 2000,
  },
});
