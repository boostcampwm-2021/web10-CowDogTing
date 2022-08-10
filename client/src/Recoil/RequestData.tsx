import { atom, selector } from "recoil";
import { getFetch } from "../Common/api";
import { RequestType } from "../Common/type";
import { REQUEST_URL } from "../Common/URL";
import { userState } from "./UserData";

export const requestState = atom<RequestType[]>({
  key: "requestState",
  default: [],
});

export const requestStateSelector = selector<RequestType[]>({
  key: "requestFetchData",
  get: () => {
    return getFetch({ url: REQUEST_URL, query: "" });
  },
});

export const requestForMeSelector = selector({
  key: "requestForMeSelector",
  get: ({ get }) => {
    const { id: myId, gid: mygId } = get(userState);
    const datas = get(requestState);
    return datas.filter((data: RequestType) => {
      if (data == null) return false;
      if (!data.info.member) {
        return data?.from !== myId;
      }
      return Number(data.to) === mygId;
    });
  },
});

export const requestToMeSelector = selector({
  key: "requestToMeSelector",
  get: ({ get }) => {
    const { id: myId, gid: mygId } = get(userState);
    const datas = get(requestState);
    return datas.filter((data: RequestType) => {
      if (data == null) return false;
      if (!data.info.member) {
        return data?.from === myId;
      }
      return Number(data.to) !== mygId;
    });
  },
});
