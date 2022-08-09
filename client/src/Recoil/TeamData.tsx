import { atom, selector } from "recoil";
import { getFetch } from "../Util/data";
import { TeamInfoType } from "../Util/type";
import { TEAM_INFO_URL } from "../Util/URL";

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
