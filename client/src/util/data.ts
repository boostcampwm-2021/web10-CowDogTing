import axios from "axios";
import { CHAT_MESSAGES_API_URL, LOGIN_API_URL, LOGOUT_API_URL, PROFILE_API_URL, REGISTER_API_URL, TEAM_CREATE_API_URL, TEAM_INVITE_API_URL, TEAM_UPDATE_API_URL, USER_INFO_API_URL } from "./URL";
import { ChangeTeamInfoType, loginInfo, PostTeamType, registerInfo } from "./type";
import { responseCheck } from ".";

export const changeTeamInfo = async ({ teamName, teamInfo, location }: ChangeTeamInfoType) => {
  try {
    const response = await axios.post(
      TEAM_UPDATE_API_URL,
      {
        name: teamName,
        description: teamInfo,
        location,
      },
      { withCredentials: true }
    );
    responseCheck(response);
    const { data } = response;
    return data;
  } catch (error) {
    return error;
  }
};

export const createTeam = async ({ teamName, teamInfo, location }: PostTeamType) => {
  try {
    const response = await axios.post(
      TEAM_CREATE_API_URL,
      {
        name: teamName,
        description: teamInfo,
        location,
      },
      { withCredentials: true }
    );
    responseCheck(response);
    const {
      data: { gid },
    } = response;
    return gid;
  } catch (error) {
    return error;
  }
};

export const inviteTeam = async ({ userId }: { userId: string }) => {
  try {
    const response = await axios.post(
      TEAM_INVITE_API_URL,
      {
        userId,
      },
      { withCredentials: true }
    );
    responseCheck(response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postLogin = async ({ id, pw }: loginInfo) => {
  try {
    const response = await axios.post(
      LOGIN_API_URL,
      {
        uid: id,
        password: pw,
      },
      { withCredentials: true }
    );
    responseCheck(response);
    return "success";
  } catch (error) {
    return error;
  }
};

export const registerUser = async ({ id, pw, location, age, sex, info }: registerInfo) => {
  try {
    const response = await axios.post(REGISTER_API_URL, {
      uid: id,
      password: pw,
      location,
      age,
      sex,
      info,
    });
    responseCheck(response);
    return "success";
  } catch (error) {
    return error;
  }
};

export const getCowDogInfo = async (person: number, index: number) => {
  try {
    const response = await axios.get(`${PROFILE_API_URL}?person=${person}&index=${index}`);
    responseCheck(response);
    const { data } = response;
    return data;
  } catch (error) {
    return error;
  }
};

export const getChatMessage = async ({ index, chatRoomId }: { index: number; chatRoomId: number }) => {
  try {
    const response = await axios.get(`${CHAT_MESSAGES_API_URL}?chatRoomId=${chatRoomId}&index=${index}`);
    responseCheck(response);
    const { data } = response;
    return data;
  } catch (error) {
    return error;
  }
};
export const changeMyInfo = async ({ id, location, age, info }: { id: string; location: string; age: number; info: string }) => {
  try {
    const response = await axios.post(
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
    responseCheck(response);
    return "success";
  } catch (err) {
    return err;
  }
};
export const logOutUser = async () => {
  try {
    const response = await axios.get(LOGOUT_API_URL, { withCredentials: true });
    responseCheck(response);
    return response;
  } catch (error) {
    return error;
  }
};
