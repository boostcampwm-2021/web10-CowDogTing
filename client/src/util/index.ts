import axios from "axios";
// import { useRecoilState } from "recoil";
// import { userState } from "../Recoil/Atom";
import { ChangeTeamInfoType, loginInfo, PostTeamType, registerInfo } from "./type";

const url = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const changeTeamInfo = async ({ teamName, teamInfo, location }: ChangeTeamInfoType) => {
  const { data } = await axios.post(
    `${url}${process.env.REACT_APP_TEAM_UPDATE_API_URL}`,
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
    `${url}${process.env.REACT_APP_TEAM_CREATE_API_URL}`,
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
    `${url}${process.env.REACT_APP_TEAM_INVITE_API_URL}`,
    {
      userId,
    },
    { withCredentials: true }
  );
  return data;
};

export const postLogin = async ({ id, pw }: loginInfo) => {
  const { data } = await axios.post(
    `${url}${process.env.REACT_APP_LOGIN_API_URL}`,
    {
      uid: id,
      password: pw,
    },
    { withCredentials: true }
  );
  return data;
  try {
    return true;
  } catch (err) {
    return false;
  }
};

export const registerUser = async ({ id, pw, location, age, sex, info }: registerInfo) => {
  await axios.post(`${url}${process.env.REACT_APP_REGISTER_API_URL}`, {
    uid: id,
    password: pw,
    location,
    age,
    sex,
    info,
  });
};

export const getCowDogInfo = async (person: number, index: number) => {
  const { data } = await axios.get(`${url}${process.env.REACT_APP_GET_PROFILE_API_URL}?person=${person}&index=${index}`);
  return data;
};

export const getChatMessage = async ({ index, chatRoomId }: { index: number; chatRoomId: number }) => {
  const { data } = await axios.get(`${url}${process.env.REACT_APP_GET_CHAT_MESSAGES_API_URL}?chatRoomId=${chatRoomId}&index=${index}`);
  return data;
};
export const changeMyInfo = async ({ id, location, age, info }: { id: string; location: string; age: number; info: string }) => {
  try {
    await axios.post(
      `${url}${process.env.REACT_APP_GET_USER_INFO_API_URL}`,
      {
        id,
        location,
        age,
        info,
      },
      {
        withCredentials: true,
      }
    );
    return true;
  } catch (err) {
    return false;
  }
};
export const logOutUser = async () => {
  const { data } = await axios.get(`${url}${process.env.REACT_APP_LOGOUT_API_URL}`, { withCredentials: true });
  return data;
};
