import { atom, selector } from "recoil";
import { ChatInfoType, ErrorType, ProfileType } from "@Common/type";
import { userState } from "./UserData";

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

export const getChatMemberSelector = selector({
  key: "getChatMemberSelector",
  get: ({ get }) => {
    const { member } = get(chatTarget);
    const { id: myId } = get(userState);
    return member.filter((userInfo) => userInfo.id !== myId);
  },
});
