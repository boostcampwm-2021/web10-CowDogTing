/* eslint-disable no-console */
/* eslint-disable no-debugger */
import axios from "axios";
import { ACCEPT_API_URL, CHAT_MESSAGES_API_URL, DENY_API_URL, LOGIN_API_URL, LOGOUT_API_URL, PROFILE_API_URL, REGISTER_API_URL, REQUEST_API_URL, TEAM_CREATE_API_URL, TEAM_INVITE_API_URL, TEAM_UPDATE_API_URL, USER_INFO_API_URL } from "./URL";
import { ChangeTeamInfoType, loginInfo, PostTeamType, registerInfo } from "./type";

export const changeTeamInfo = async ({ teamName, teamInfo, location }: ChangeTeamInfoType) => {
  try {
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
  } catch (error) {
    return "error";
  }
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
    return "error";
  }
};

export const inviteTeam = async ({ userId }: { userId: string }) => {
  try {
    const { data } = await axios.post(
      TEAM_INVITE_API_URL,
      {
        userId,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    return "error";
  }
};

export const postLogin = async ({ id, pw }: loginInfo) => {
  try {
    console.log("?");
    const { data } = await axios.post(
      LOGIN_API_URL,
      {
        uid: id,
        password: pw,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    return "error";
  }
};

export const registerUser = async ({ id, pw, location, age, sex, info }: registerInfo) => {
  try {
    const { data } = await axios.post(REGISTER_API_URL, {
      uid: id,
      password: pw,
      location,
      age,
      sex,
      info,
    });
    return data;
  } catch (error) {
    return "error";
  }
};

export const getCowDogInfo = async (person: number, index: number) => {
  try {
    const { data } = await axios.get(`${PROFILE_API_URL}?person=${person}&index=${index}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return [];
  }
};

export const getChatMessage = async ({ index, chatRoomId }: { index: number; chatRoomId: number }) => {
  try {
    const { data } = await axios.get(`${CHAT_MESSAGES_API_URL}?chatRoomId=${chatRoomId}&index=${index}`);
    return data;
  } catch (error) {
    return "error";
  }
};
export const changeMyInfo = async ({ id, location, age, info }: { id: string; location: string; age: number; info: string }) => {
  try {
    const { data } = await axios.post(
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

    return data;
  } catch (error) {
    return "error";
  }
};
export const logOutUser = async () => {
  try {
    const { data } = await axios.get(LOGOUT_API_URL, { withCredentials: true });
    return data;
  } catch (error) {
    return "error";
  }
};

export const requestAccept = async ({ from, to }: { from: string | number; to: string | number }): Promise<void> => {
  await axios.post(
    ACCEPT_API_URL,
    {
      from,
      to,
    },
    { withCredentials: true }
  );
};

export const requestDeny = async ({ from, to }: { from: string | number; to: string | number }): Promise<void> => {
  await axios.post(
    DENY_API_URL,
    {
      from,
      to,
    },
    { withCredentials: true }
  );
};

export const requestChat = async ({ from, to }: { from: string | number; to: string | number }): Promise<boolean> => {
  const { data } = await axios.post(
    REQUEST_API_URL,
    {
      from,
      to,
    },
    { withCredentials: true }
  );
  return data;
};

export const getFetch = async ({ url, query }: { url: string; query: string }): Promise<any> => {
  const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}${url}${query}`, {
    withCredentials: true,
  });
  return data;
};
