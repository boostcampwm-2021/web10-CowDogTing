import { atom } from "recoil";
import { ChatInfoType, JoinChatsType, PersonInfoType, ProfileType, RequestType, TeamInfoType } from "../util/type";

export const userState = atom<PersonInfoType>({
  key: "user",
  default: {
    id: "yj",
    image: "33",
    location: "우만동",
    sex: "male",
    age: 25,
    info: "안녕하세요",
    gid: null,
  },
});

export const teamState = atom<TeamInfoType>({
  key: "teamState",
  default: {
    id: "팀명",
    image: "asdfasf",
    location: "우만동",
    sex: "male",
    age: 23,
    info: "asdfasfd",
    leader: "",
    member: [
      {
        id: "yj",
        image: "Image",
        location: "우만동",
        age: 23,
        sex: "male",
        info: "안녕하세요",
      },
      {
        id: "hansory",
        image: "Image",
        location: "우만동",
        age: 23,
        sex: "male",
        info: "안녕하세요",
      },
    ],
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
