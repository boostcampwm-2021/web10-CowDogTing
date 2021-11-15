/* eslint-disable no-console */
import axios from "axios";
import { selector, selectorFamily } from "recoil";

export const testSelector = selector({
  key: "test",
  get: () => {},
  set: () => {},
});

// export const fool = selector({
//   key: "fool",
//   get: ({ get }) => {
//     return get(testState);
//   },
//   set: ({ set }) => {
//     set(testState, "aa");
//   },
// });

export const fetchGet = selectorFamily({
  key: "fetchGet",
  get:
    ({ url, query }: { url: string; query: string }) =>
    async (): Promise<any> => {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}${url}${query}`, {
        withCredentials: true,
      });
      return data;
    },
});
