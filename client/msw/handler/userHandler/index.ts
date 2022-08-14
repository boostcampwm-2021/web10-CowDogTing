import { rest } from "msw";
import { profileHandler } from "./profileHandler";
import { userInfoHandler } from "./userInfoHandler";
import { userHandler } from "./userHandler";
import { PROFILE_API_URL, USER_INFO_API_URL, USER_URL } from "../../../src/Common/URL";

export const user = [rest.get(USER_URL, userHandler), rest.post(USER_INFO_API_URL, userInfoHandler), rest.get(PROFILE_API_URL, profileHandler)];
