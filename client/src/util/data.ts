import axios from "axios";
import { CHAT_MESSAGES_API_URL, LOGIN_API_URL, LOGOUT_API_URL, PROFILE_API_URL, REGISTER_API_URL, TEAM_CREATE_API_URL, TEAM_INVITE_API_URL, TEAM_UPDATE_API_URL, USER_INFO_API_URL } from "./URL";
import { ChangeTeamInfoType, loginInfo, PostTeamType, registerInfo } from "./type";

export const changeTeamInfo = async ({ teamName, teamInfo, location }: ChangeTeamInfoType) => {
  const { data } = await axios.post(
    TEAM_UPDATE_API_URL,
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
  try {
    const {
      data: { gid },
    } = await axios.post(
      TEAM_CREATE_API_URL,
      {
        name: teamName,
        description: teamInfo,
        location,
      },
      { withCredentials: true }
    );
    return gid;
  } catch (error) {
    return -1;
  }
};

export const inviteTeam = async ({ userId }: { userId: string }) => {
  const { data } = await axios.post(
    TEAM_INVITE_API_URL,
    {
      userId,
    },
    { withCredentials: true }
  );
  return data;
};

export const postLogin = async ({ id, pw }: loginInfo) => {
  const { data } = await axios.post(
    LOGIN_API_URL,
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
  await axios.post(REGISTER_API_URL, {
    uid: id,
    password: pw,
    location,
    age,
    sex,
    info,
  });
};

export const getCowDogInfo = async (person: number, index: number) => {
  const { data } = await axios.get(`${PROFILE_API_URL}?person=${person}&index=${index}`);
  return data;
};

export const getChatMessage = async ({ index, chatRoomId }: { index: number; chatRoomId: number }) => {
  const { data } = await axios.get(`${CHAT_MESSAGES_API_URL}?chatRoomId=${chatRoomId}&index=${index}`);
  return data;
};
export const changeMyInfo = async ({ id, location, age, info }: { id: string; location: string; age: number; info: string }) => {
  try {
    await axios.post(
      USER_INFO_API_URL,
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
  const { data } = await axios.get(LOGOUT_API_URL, { withCredentials: true });
  return data;
};
