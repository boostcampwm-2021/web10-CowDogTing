export const URL = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export const TEAM_INFO_URL = `${process.env.REACT_APP_GET_TEAM_INFO_API_URL}`;
export const TEAM_UPDATE_API_URL = "http://localhost:4000/team/update";
// export const TEAM_UPDATE_API_URL = `${URL}${process.env.REACT_APP_TEAM_UPDATE_API_URL}`;
export const TEAM_CREATE_API_URL = "http://localhost:4000/team/create";
// export const TEAM_CREATE_API_URL = `${URL}${process.env.REACT_APP_TEAM_CREATE_API_URL}`;
export const TEAM_INVITE_API_URL = "http://localhost:4000/team/invite";
// export const TEAM_INVITE_API_URL = `${URL}${process.env.REACT_APP_TEAM_INVITE_API_URL}`;
export const TEAM_EXIT_API_URL = "http://localhost:4000/team/exit";
// export const TEAM_EXIT_API_URL = `${URL}${process.env.REACT_APP_TEAM_EXIT_API_URL}`;

export const REQUEST_URL = "http://localhost:4000/request";
// export const REQUEST_URL = `${process.env.REACT_APP_GET_REQUEST_API_URL}`;
export const REQUEST_API_URL = "http://localhost:4000/request/post";
// export const REQUEST_API_URL = `${URL}${process.env.REACT_APP_POST_POST_REQUEST_API_URL}`;
export const DENY_API_URL = "http://localhost:4000/request/deny";
// export const DENY_API_URL = `${URL}${process.env.REACT_APP_POST_DENY_REQUEST_API_URL}`;
export const ACCEPT_API_URL = "http://localhost:4000/request/accept";
// export const ACCEPT_API_URL = `${URL}${process.env.REACT_APP_POST_ACCEPT_REQUEST_API_URL}`;

export const CHAT_INFO_URL = "http://localhost:4000/chat/info";
// export const CHAT_INFO_URL = `${process.env.REACT_APP_GET_CHAT_INFO_API_URL}`;
export const CHAT_MESSAGES_API_URL = "http://localhost:4000/chat/messages";
// export const CHAT_MESSAGES_API_URL = `${URL}${process.env.REACT_APP_GET_CHAT_MESSAGES_API_URL}`;
export const POST_CHAT_API_URL = "http://localhost:4000/chat/postChat";
// export const POST_CHAT_API_URL = `${URL}${process.env.REACT_APP_POST_CHAT_API_URL}`;
export const POST_CHAT_READ_API_URL = "http://localhost:4000/chat/read";
// export const POST_CHAT_READ_API_URL = `${URL}${process.env.REACT_APP_POST_CHAT_READ_API_URL}`;

export const USER_URL = "http://localhost:4000/core/userInfo";
// export const USER_URL = `${process.env.REACT_APP_GET_USER_INFO_API_URL}`;
export const JOIN_CHAT_URL = "http://localhost:4000/core/joinChatInfo";
// export const JOIN_CHAT_URL = `${process.env.REACT_APP_GET_JOIN_CHAT_INFO_API_URL}`;
export const PROFILE_API_URL = "http://localhost:4000/core/profile";
// export const PROFILE_API_URL = `${URL}${process.env.REACT_APP_GET_PROFILE_API_URL}`;
export const USER_INFO_API_URL = "http://localhost:4000/core/userInfo";
// export const USER_INFO_API_URL = `${URL}${process.env.REACT_APP_POST_USER_INFO_API_URL}`;
export const POST_IMAGE_API_URL = "http://localhost:4000/core/image";
// export const POST_IMAGE_API_URL = `${URL}${process.env.REACT_APP_POST_IMAGE_API_URL}`;

export const REGISTER_API_URL = "http://localhost:4000/auth/register";
// export const REGISTER_API_URL = `${URL}${process.env.REACT_APP_REGISTER_API_URL}`;
export const LOGIN_API_URL = "http://localhost:4000/auth/login";
// export const LOGIN_API_URL = `${URL}${process.env.REACT_APP_LOGIN_API_URL}`;
export const LOGOUT_API_URL = "http://localhost:4000/auth/logout";
// export const LOGOUT_API_URL = `${URL}${process.env.REACT_APP_LOGOUT_API_URL}`;
export const CHECK_ID_VALIDATION_URL = "http://localhost:4000/auth/id-validation";
// export const CHECK_ID_VALIDATION_URL = `${URL}${process.env.REACT_APP_GET_ID_VALIDATION}`;

export const SOCIAL_NAVER_LOGIN = `${URL}${process.env.REACT_APP_SOCAIL_LOGIN_NAVER}`;
export const SOCIAL_GITHUB_LOGIN = `${URL}${process.env.REACT_APP_SOCAIL_LOGIN_GITHUB}`;
export const SOCIAL_KAKAO_LOGIN = `${URL}${process.env.REACT_APP_SOCAIL_LOGIN_KAKAO}`;
