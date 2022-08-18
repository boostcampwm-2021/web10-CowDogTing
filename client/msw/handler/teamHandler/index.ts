import { rest } from "msw";
import { TEAM_CREATE_API_URL, TEAM_EXIT_API_URL, TEAM_INFO_URL, TEAM_INVITE_API_URL, TEAM_UPDATE_API_URL } from "../../../src/Common/URL";
import { teamUpdateHandler } from "./teamUpdateHandler";
import { teamCreateHandler } from "./teamCreateHandler";
import { teamExitHandler } from "./teamExitHandler";
import { teamInviteHandler } from "./teamInviteHandler";
import { teamInfoHandler } from "./teamInfoHandler";

export const teamHandler = [rest.post(TEAM_UPDATE_API_URL, teamUpdateHandler), rest.post(TEAM_CREATE_API_URL, teamCreateHandler), rest.post(TEAM_INVITE_API_URL, teamInviteHandler), rest.post(TEAM_EXIT_API_URL, teamExitHandler), rest.get(TEAM_INFO_URL, teamInfoHandler)];
