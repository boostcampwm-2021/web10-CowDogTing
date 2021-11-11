import { _createTeam, findTeam, _updateTeam, _inviteTeam } from "./service";

export const getTeamInfo = async (req, res, next) => {
  if (req.user) {
    res.send({ error: "로그인 안했음" });
    return;
  }
  const gid = req.user.gid;
  if (gid === null) {
    res.send({ error: "팀 없음" });
    return;
  }

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
    if (!result) res.send({ error: "팀 생성 실패" });
    if (result) res.send({ success: "팀 생성 성공" });
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  const teamInfo = req.body;
  try {
    const result = await _updateTeam({ teamInfo });
    if (!result) res.send({ error: "팀 수정 실패" });
    if (result) res.send({ success: "팀 수정 성공" });
  } catch (error) {
    next(error);
  }
};

export const inviteTeam = async (req, res, next) => {
  // swagger에 잘못 나와있는거가틈. 팀 아이디가 없음
  const inviteInfo = req.body;
  try {
    const result = await _inviteTeam({ inviteInfo });
    if (!result) res.send({ error: "팀 초대 실패" });
    if (result) res.send({ success: "팀 초대  성공" });
  } catch (error) {
    next(error);
  }
};
