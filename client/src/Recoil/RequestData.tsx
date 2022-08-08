import { atom, selector } from "recoil";
import { getFetch } from "../Util/data";
import { RequestType } from "../Util/type";
import { REQUEST_URL } from "../Util/URL";

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
