import axios from "axios";
import { selector, selectorFamily } from "recoil";
// import { selector, selectorFamily, useRecoilState, useRecoilValue } from "recoil";
// import { testState } from "./Atom";

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
      const { data } = await axios.get(`localhost:3000/${url}?${query}`);
      return data;
    },
});
// const fetchGetState = useRecoilValue(fetchGet({ url: "aaa", query: "aaa", atom: fool }));
// const result = await fetchGetState();
