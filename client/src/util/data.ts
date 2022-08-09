import axios, { AxiosResponse } from "axios";
import { TEAM_EXIT_API_URL, ACCEPT_API_URL, CHAT_MESSAGES_API_URL, DENY_API_URL, LOGIN_API_URL, LOGOUT_API_URL, POST_CHAT_API_URL, POST_IMAGE_API_URL, PROFILE_API_URL, REGISTER_API_URL, REQUEST_API_URL, TEAM_CREATE_API_URL, TEAM_INVITE_API_URL, TEAM_UPDATE_API_URL, USER_INFO_API_URL, POST_CHAT_READ_API_URL, CHECK_ID_VALIDATION_URL } from "./URL";
import { ChangeTeamInfoType, loginInfo, PersonInfoType, PostTeamType, registerInfo } from "./type";
import { fromImageToForm } from ".";

export const changeTeamInfo = async ({ teamName, teamInfo, location }: ChangeTeamInfoType) => {
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
    throw new Error();
  }
};

export const inviteTeam = ({ userId }: { userId: string }): Promise<AxiosResponse<PersonInfoType>> =>
  axios.post(
    TEAM_INVITE_API_URL,
    {
      userId,
    },
    { withCredentials: true }
  );

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
    throw new Error();
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
    throw new Error();
  }
};

export const getCowDogInfo = async (person: number, index: number, category: string) => {
  try {
    const { data } = await axios.get(`${PROFILE_API_URL}?person=${person}&index=${index}${category}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const getChatMessage = async ({ index, chatRoomId }: { index: number; chatRoomId: number }) => {
  try {
    const { data } = await axios.get(`${CHAT_MESSAGES_API_URL}?chatRoomId=${chatRoomId}&index=${index}`);
    return data;
  } catch (error) {
    throw new Error();
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
    throw new Error("내 정보 수정에 실패했습니다");
  }
};
export const logOutUser = async () => {
  try {
    const { data } = await axios.get(LOGOUT_API_URL, { withCredentials: true });
    return data;
  } catch (error) {
    throw new Error();
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
    throw new Error(e as string);
  }
};

export const getFetch = async ({ url, query }: { url: string; query: string }): Promise<any> => {
  const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}${url}${query}`, {
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

export const changeNotReadToRead = (chatRoomId: number) => {
  axios.post(POST_CHAT_READ_API_URL, { chatRoomId }, { withCredentials: true });
};

export const checkIdValidation = async (uid: string) => {
  const { data } = await axios.get(`${CHECK_ID_VALIDATION_URL}?uid=${uid}`, { withCredentials: true });
  return data;
};
