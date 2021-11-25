import { Team, TeamAttributes } from "../../db/models/team";
import { Users } from "../../db/models/users";
import { findUser } from "../util";

export const findTeam = async ({ gid }: { gid: number }) => {
  const query = {
    attributes: ["image", ["name", "id"], ["description", "info"], "location", "leader"],
    include: [
      {
        model: Users,
        as: "member",
        attributes: [["uid", "id"], "image", "location", "age", "sex"],
      },
    ],
    where: { gid },
  };
  const teamInfos = await Team.findOne(query as object);
  return teamInfos;
};

export const handleCreateTeam = async (teamInfo: TeamAttributes) => {
  const team = await Team.create(teamInfo);
  const gid = team.getDataValue("gid");
  await Users.update({ gid: gid }, { where: { uid: teamInfo.leader } });
  return gid;
};
export const handleUpdateTeam = async (teamInfo: TeamAttributes) => {
  try {
    const { gid } = teamInfo;
    const { name, description, location } = teamInfo;
    const updateTeamInfo = { name, description, location };
    await Team.update(updateTeamInfo, { where: { gid } });
    return "success";
  } catch (error) {
    return new Error("업데이트 실패");
  }
};
export const handleInviteTeam = async ({ gid, userId, sex }: { gid: number; userId: string; sex: string }) => {
  try {
    const checkNum = await Users.count({ where: { gid } });
    if (checkNum > 4) return false;
    const checkUser = await findUser({ uid: userId });
    if (!checkUser || checkUser.sex !== sex || checkUser.gid !== null) return false;
    await Users.update({ gid }, { where: { uid: userId }, returning: true });
    return checkUser;
  } catch (error) {
    return new Error("업데이트 실패");
  }
};

export const _getGroupId = async ({ teamName }: { teamName: string }) => {
  const query = {
    raw: true,
    attributes: ["gid"],
    where: { name: teamName },
  };
  return await Team.findOne(query);
};

export const handleExitTeam = async ({ uid }: { uid: string }) => {
  return await Users.update({ gid: null }, { where: { uid }, logging: true });
};
