import axios from "axios";
import { ChangeTeamInfoType, loginInfo, PostTeamType, registerInfo } from "./type";

const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const changeTeamInfo = async ({ beforeTeamName, teamName, teamInfo, location }: ChangeTeamInfoType) => {
  await axios.post(`${url}/api/team/update`, {
    originTeamName: beforeTeamName,
    name: teamName,
    description: teamInfo,
    location,
  });
};

export const createTeam = async ({ teamName, teamInfo, location }: PostTeamType) => {
  await axios.post(
    `${url}/api/team/create`,
    {
      name: teamName,
      description: teamInfo,
      location,
    },
    { withCredentials: true }
  );
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

export const changeMyInfo = async ({ id, location, age, info }: { id: string; location: string; age: number; info: string }) => {
  try {
    await axios.post(`${url}/api/core/userInfo`, {
      id,
      location,
      age,
      info,
    });
    return true;
  } catch (err) {
    return false;
  }
};
