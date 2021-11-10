import axios from "axios";
import { ChangeTeamInfoType, loginInfo, PostTeamType, registerInfo } from "./type";

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

export const postLogin = async ({ id, pw }: loginInfo) => {
  console.log("로그인 버튼 클릭");
  console.log(`${url}/api/auth/login`);
  await axios.post(
    `${url}/api/auth/login`,
    {
      uid: id,
      password: pw,
    },
    { withCredentials: true }
  );
};

export const registerUser = async ({ id, pw, location, age, sex }: registerInfo) => {
  await axios.post(`${url}/api/auth/register`, {
    uid: id,
    password: pw,
    location,
    age,
    sex,
  });
};

export const getCowDogInfo = async (person: number, index: number) => {
  const { data } = await axios.get(`${url}/api/core/profile?person=?${person}?index=${index}`);
  return data;
};
