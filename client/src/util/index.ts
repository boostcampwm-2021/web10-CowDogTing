import axios from "axios";
import { ChangeTeamInfoType, PostTeamType } from "./type";

const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const changeTeamInfo = async ({ beforeTeamName, teamName, teamInfo, location, leader }: ChangeTeamInfoType) => {
  await axios.post(`${url}/api/team/update`, {
    originTeamName: beforeTeamName,
    name: teamName,
    description: teamInfo,
    location,
    leader,
  });
};

export const createTeam = async ({ teamName, teamInfo, location, leader }: PostTeamType) => {
  await axios.post(`${url}/api/team/create`, {
    name: teamName,
    description: teamInfo,
    location,
    leader,
  });
};
