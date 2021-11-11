import axios from "axios";
import { ChangeTeamInfoType, loginInfo, PostTeamType, registerInfo } from "./type";

const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const changeTeamInfo = async ({ teamName, teamInfo, location }: ChangeTeamInfoType) => {
  const { data } = await axios.post(
    `${url}/api/team/update`,
    {
      name: teamName,
      description: teamInfo,
      location,
    },
    { withCredentials: true }
  );
  return data;
};

export const createTeam = async ({ teamName, teamInfo, location }: PostTeamType) => {
  const {
    data: { gid },
  } = await axios.post(
    `${url}/api/team/create`,
    {
      name: teamName,
      description: teamInfo,
      location,
    },
    { withCredentials: true }
  );

  return gid;
};

export const inviteTeam = async ({ userId }: { userId: string }) => {
  const { data } = await axios.post(
    `${url}/api/team/invite`,
    {
      userId,
    },
    { withCredentials: true }
  );
  return data;
};

export const postLogin = async ({ id, pw }: loginInfo) => {
  await axios.post(
    `${url}/api/auth/login`,
    {
      uid: id,
      password: pw,
    },
    { withCredentials: true }
  );
};

export const registerUser = async ({ id, pw, location, age, sex, info }: registerInfo) => {
  await axios.post(`${url}/api/auth/register`, {
    uid: id,
    password: pw,
    location,
    age,
    sex,
    info,
  });
};

export const getCowDogInfo = async (person: number, index: number) => {
  const { data } = await axios.get(`${url}/api/core/profile?person=${person}&index=${index}`);
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
