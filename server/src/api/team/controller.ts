import { _createTeam, findTeam, _updateTeam, _inviteTeam } from "./service";

export const getTeamInfo = async (req, res, next) => {
  const gid = req.query.teamId;
  try {
    const data = await findTeam({ gid });
    if (!data) res.send({ error: "팀 찾기 실패" });
    res.send(data);
  } catch (error) {
    next(error);
  }
};
export const createTeam = async (req, res, next) => {
  const teamInfo = req.body;
  try {
    const result = await _createTeam({ teamInfo });
    /*
    if (!result) res.send({ error: "팀 생성 실패" });
    if (result) res.send({ success: "팀 생성 성공" });
    */
  } catch (error) {
    next(error);
  }
};
export const updateTeam = async (req, res, next) => {
  const teamInfo = res.teamInfo;
  await _updateTeam({ teamInfo });
};
export const inviteTeam = async (req, res, next) => {
  // swagger에 잘못 나와있는거가틈. 팀 아이디가 없음
  const gid = res.teamID;
  const inviteID = res.inviteID;
  await _inviteTeam({ gid, inviteID });
};
