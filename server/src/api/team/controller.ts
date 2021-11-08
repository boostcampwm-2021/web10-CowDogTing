import { _createTeam, findTeam, _updateTeam, _inviteTeam } from "./service";

/**
 *
 * @param res
 * @param req
 *
 * [get] : /api/team/info
 */
export const getTeamInfo = async (req, res) => {
  const {
    query: { teamId: gid },
  } = req;

  try {
    const data = await findTeam({ gid });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
export const createTeam = async (req, res) => {
  const { teamInfo } = res;
  await _createTeam({ teamInfo });
};
export const updateTeam = async (req, res) => {
  const { teamInfo } = res;
  await _updateTeam({ teamInfo });
};
export const inviteTeam = async (req, res) => {
  // swagger에 잘못 나와있는거가틈. 팀 아이디가 없음
  const gid = res.teamID;
  const { inviteID } = res;
  await _inviteTeam({ gid, inviteID });
};
