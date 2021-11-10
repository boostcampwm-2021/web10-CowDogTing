const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const changeTeamInfo = async ({ teamName, teamInfoInput, location, leader }) => {
  await axios.post(`${url}/api/team/update`, {
    originTeamName: "ajouUniv",
    name: teamName,
    description: teamInfoInput,
    location,
    leader,
  });
};
