import { atom, selector } from "recoil";
import { getFetch } from "../Util/data";
import { ChatInfoType, joinChatType } from "../Util/type";
import { CHAT_INFO_URL, JOIN_CHAT_URL } from "../Util/URL";
import { chatTarget } from "./Atom";
import { userState } from "./UserData";

export const joinChatRoomState = atom<joinChatType[]>({
  key: "joinChatRoomState",
  default: [],
});

export const joinChatRoomSelector = selector<joinChatType[]>({
  key: "joinChatRoomSelector",
  get: () => {
    return getFetch({ url: JOIN_CHAT_URL, query: "" });
  },
});

export const chatsState = atom<ChatInfoType[]>({
  key: "chatState",
  default: [],
});

export const chatSelector = selector<ChatInfoType[]>({
  key: "chatSelector",
  get: () => {
    return getFetch({ url: CHAT_INFO_URL, query: "" });
  },
});

export const userChatRoomInfo = selector({
  key: "userChatRoomInfo",
  get: ({ get }) => {
    const { chatRoomId } = get(chatTarget);
    const { id } = get(userState);
    return { chatRoomId, id };
  },
});
