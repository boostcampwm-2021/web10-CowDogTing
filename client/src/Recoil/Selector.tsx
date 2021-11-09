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
    ({ url, query, atom }: { url: string; query: string; atom: any }) =>
    async ({ get }: any): Promise<any> => {
      const response = await fetch(`localhost:3000/${url}?${query}=${get(atom)}`);
      return response.json();
    },
});
// const fetchGetState = useRecoilValue(fetchGet({ url: "aaa", query: "aaa", atom: fool }));
// const result = await fetchGetState();
