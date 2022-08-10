import { atom, selector } from "recoil";
import { getFetch } from "../Common/api";
import { TeamInfoType } from "../Common/type";
import { TEAM_INFO_URL } from "../Common/URL";

export const teamState = atom<TeamInfoType>({
  key: "teamState",
  default: {
    id: "",
    image: null,
    location: "",
    sex: "",
    age: 0,
    info: "",
    leader: "",
    member: [],
  },
});

export const teamStateSelector = selector<TeamInfoType>({
  key: "fetchTeamData",
  get: () => {
    return getFetch({ url: TEAM_INFO_URL, query: "" });
  },
});
