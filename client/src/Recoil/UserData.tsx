import { atom, selector } from "recoil";
import { getFetch } from "../Util/data";
import { PersonInfoType } from "../Util/type";
import { USER_URL } from "../Util/URL";

export const userState = atom<PersonInfoType>({
  key: "user",
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

export const userStateSelector = selector<PersonInfoType>({
  key: "fetchUserData",
  get: () => {
    return getFetch({ url: USER_URL, query: "" });
  },
});
