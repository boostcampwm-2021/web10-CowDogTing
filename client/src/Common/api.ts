import axios, { AxiosResponse } from "axios";
import { TEAM_EXIT_API_URL, ACCEPT_API_URL, CHAT_MESSAGES_API_URL, DENY_API_URL, LOGIN_API_URL, LOGOUT_API_URL, POST_CHAT_API_URL, POST_IMAGE_API_URL, PROFILE_API_URL, REGISTER_API_URL, REQUEST_API_URL, TEAM_CREATE_API_URL, TEAM_INVITE_API_URL, TEAM_UPDATE_API_URL, USER_INFO_API_URL, POST_CHAT_READ_API_URL, CHECK_ID_VALIDATION_URL } from "./URL";
import { loginInfo, MessageType, PersonInfoType, ProfileType, registerInfo } from "./type";
import { fromImageToForm } from "./util";

export type PostTeamType = {
  teamName: string;
  teamInfo: string;
  location: string;
};

export const changeTeamInfo = async ({ teamName, teamInfo, location }: PostTeamType) => {
  try {
    const res = await axios.post(
      TEAM_UPDATE_API_URL,
      {
        name: teamName,
        description: teamInfo,
        location,
      },
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    throw new Error("팀 정보 수정에 실패했습니다.");
  }
};

export const exitTeam = () => axios.post(TEAM_EXIT_API_URL, {}, { withCredentials: true });

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
    throw new Error("팀 생성에 실패하셨습니다.");
  }
};

export const inviteTeam = async ({ userId }: { userId: string }): Promise<AxiosResponse<PersonInfoType>> => {
  try {
    const res = await axios.post(
      TEAM_INVITE_API_URL,
      {
        userId,
      },
      { withCredentials: true }
    );
    return res;
  } catch (e) {
    throw new Error("유저가 존재하지 않습니다.");
  }
};

export const postLogin = async ({ id, pw }: loginInfo) => {
  try {
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
    throw new Error("아이디,비밀번호를 확인해 주세요");
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
    throw new Error((error as any).response.data.errorMessage);
  }
};

export const getCowDogInfo = async (person: number, index: number, category: string): Promise<ProfileType[]> => {
  try {
    const data = await getFetch({ url: PROFILE_API_URL, query: `?person=${person}&index=${index}${category}` });
    return data;
  } catch (error) {
    throw new Error((error as any).response?.data?.errorMessage ?? (error as any).message);
  }
};

export const getChatMessage = async ({ index, chatRoomId }: { index: number; chatRoomId: number }): Promise<MessageType[]> => {
  try {
    const { data } = await axios.get(`${CHAT_MESSAGES_API_URL}?chatRoomId=${chatRoomId}&index=${index}`);
    return data;
  } catch (e) {
    throw new Error((e as any).response.data.errorMessage);
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
  } catch (e) {
    throw new Error((e as any).response.data.errorMessage);
    // throw new Error("내 정보 수정에 실패했습니다");
  }
};
export const logOutUser = async () => {
  try {
    const { data } = await axios.get(LOGOUT_API_URL, { withCredentials: true });
    return data;
  } catch (e) {
    throw new Error((e as any).response.data.errorMessage);
  }
};

export const requestAccept = async ({ from, to }: { from: string | number; to: string | number }): Promise<void> => {
  try {
    const res = await axios.post(
      ACCEPT_API_URL,
      {
        from,
        to,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    throw new Error((e as any).response.data.errorMessage);
  }
};

export const requestDeny = async ({ from, to }: { from: string | number; to: string | number }): Promise<boolean> => {
  try {
    const res = await axios.post(
      DENY_API_URL,
      {
        from,
        to,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    throw new Error((e as any).response.data.errorMessage);
  }
};

export const requestChat = async ({ from, to }: { from: string | number; to: string | number }): Promise<boolean> => {
  try {
    const { data } = await axios.post(
      REQUEST_API_URL,
      {
        from,
        to,
      },
      { withCredentials: true }
    );
    if (!data) throw new Error("API Error");
    return data;
  } catch (e) {
    throw new Error((e as any).response?.data?.errorMessage || (e as any).message);
  }
};

export const getFetch = async ({ url, query }: { url: string; query: string }): Promise<any> => {
  const { data } = await axios.get(`${url}${query}`, {
    // const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}${url}${query}`, {
    withCredentials: true,
  });
  return data;
};

export const postImage = async (image: Blob, id: string) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("id", id);
  const { data } = await axios.post(POST_IMAGE_API_URL, formData, { withCredentials: true });
  return data;
};

export const postChat = async (chatRoomId: number, uId: string, file: Blob) => {
  const formData = fromImageToForm(chatRoomId, uId, file);
  await axios.post(POST_CHAT_API_URL, formData, { withCredentials: true });
};

export const changeNotReadToRead = async (chatRoomId: number) => {
  try {
    const res = await axios.post(POST_CHAT_READ_API_URL, { chatRoomId }, { withCredentials: true });
    return res.data;
  } catch (e) {
    throw new Error((e as any).response.data.errorMessage);
  }
};

export const checkIdValidation = async (uid: string) => {
  try {
    const { data } = await axios.get(`${CHECK_ID_VALIDATION_URL}?uid=${uid}`, { withCredentials: true });
    return data;
  } catch (e) {
    throw new Error((e as any).response.data.errorMessage);
  }
};
