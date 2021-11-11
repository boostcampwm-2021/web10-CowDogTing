import { _createTeam, findTeam, _updateTeam, _inviteTeam } from "./service";

export const getTeamInfo = async (req, res, next) => {
  if (!req.user) {
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
  if (!req.user) {
    res.send({ error: "로그인 하지 않음" });
    return;
  }
  try {
    const { uid } = req.user;
    const result = await _createTeam({ ...teamInfo, leader: uid }); //resut:gid
    if (!result) res.send({ error: "팀 생성 실패" });
    if (result) res.send({ gid: result });
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  const teamInfo = req.body;
  if (!req.user) {
    res.send({ error: "로그인 되어있지 않음" });
    return;
  }
  const { gid } = req.user;
  try {
    const result = await _updateTeam({ gid, ...teamInfo });
    if (!result) res.send({ error: "팀 수정 실패" });
    if (result) {
      const data = { id: teamInfo.name, info: teamInfo.description, location: teamInfo.location };
      res.send(data);
    }
  } catch (error) {
    next(error);
  }
};

export const inviteTeam = async (req, res, next) => {
  // swagger에 잘못 나와있는거가틈. 팀 아이디가 없음
  const inviteInfo = req.body;
  if (!req.user) {
    res.send({ error: "로그인 되어있지 않음" });
    return;
  }
  const { gid } = req.user;
  const { userId } = inviteInfo;
  try {
    const result = await _inviteTeam({ gid, userId });
    if (!result) res.send({ error: "팀 초대 실패" });
    if (result) res.send({ success: "팀 초대  성공" });
  } catch (error) {
    next(error);
  }
};
