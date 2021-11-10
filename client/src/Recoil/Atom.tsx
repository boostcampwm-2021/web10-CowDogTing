import { atom } from "recoil";
import { ChatInfoType, JoinChatsType, PersonInfoType, ProfileType, RequestType, TeamInfoType } from "../util/type";

export const userState = atom<PersonInfoType>({
  key: "user",
  default: {
    id: "",
    image: "",
    location: "",
    sex: "",
    age: 0,
    info: "",
  },
});

export const teamState = atom<TeamInfoType>({
  key: "teamState",
  default: {
    id: "",
    image: "",
    location: "",
    sex: "",
    age: 0,
    info: "",
    leader: "",
    member: [],
  },
});

export const cowDogState = atom<{ datas: ProfileType[] }>({
  key: "cowDogState",
  default: {
    datas: [],
  },
});

export const chatState = atom<{ datas: ChatInfoType[] }>({
  key: "chatState",
  default: {
    datas: [],
  },
});

export const requestState = atom<{ datas: RequestType[] }>({
  key: "requestState",
  default: {
    datas: [],
  },
});

export const joinChatRoomState = atom<JoinChatsType>({
  key: "joinChatRoomState",
  default: {
    joinChatRooms: [],
  },
});
