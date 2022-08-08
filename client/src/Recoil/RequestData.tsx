import { atom, selector } from "recoil";
import { getFetch } from "../util/data";
import { RequestType } from "../util/type";
import { REQUEST_URL } from "../util/URL";

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
