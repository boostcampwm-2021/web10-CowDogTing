import { _createTeam, findTeam, _updateTeam, _inviteTeam } from "./service";

export const getTeamInfo = async (res, req) => {
  const gid = res.teamID;
  const data = await findTeam({ gid });
};
export const createTeam = async (res, req) => {
  const teamInfo = res.teamInfo;
  await _createTeam({ teamInfo });
};
export const updateTeam = async (res, req) => {
  const teamInfo = res.teamInfo;
  await _updateTeam({ teamInfo });
};
export const inviteTeam = async (res, req) => {
  // swagger에 잘못 나와있는거가틈. 팀 아이디가 없음
  const gid = res.teamID;
  const inviteID = res.inviteID;
  await _inviteTeam({ gid, inviteID });
};
