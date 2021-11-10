import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const changeTeamInfo = async ({ beforeTeamName, teamName, teamInfoInput, location, leader }) => {
  await axios.post(`${url}/api/team/update`, {
    originTeamName: beforeTeamName,
    name: teamName,
    description: teamInfoInput,
    location,
    leader,
  });
};

export const createTeam = async ({ teamName, teamInfo, location, leader }) => {
  await axios.post(`${url}/api/team/create`, {
    name: teamName,
    description: teamInfo,
    location,
    leader,
  });
};
