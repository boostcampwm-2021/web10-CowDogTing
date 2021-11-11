import { Team } from "../../db/models/team";
import { Users } from "../../db/models/users";

export const findTeam = async ({ gid }) => {
  const query = {
    raw: true,
    where: { gid },
    include: [
      {
        model: Users,
        as: "member",
        attributes: ["uid", "image", "location", "age", "sex"],
      },
    ],
  };
  const teamInfos = await Team.findAll(query);
  const memberInfo = teamInfos.map((info) => {
    return { id: info["member.uid"], image: info["member.image"], location: info["member.location"], age: info["member.age"], sex: info["member.sex"] };
  });
  const teamInfo = teamInfos[0];
  const filteredTeamInfo = { image: teamInfo.image, id: teamInfo.name, info: teamInfo.description, location: teamInfo.location, leader: teamInfo.leader, member: memberInfo };
  return filteredTeamInfo;
};

export const _createTeam = async (teamInfo: any) => {
  const team = await Team.create(teamInfo);
  const gid = team.getDataValue("gid");
  await Users.update({ gid: gid }, { where: { uid: teamInfo.leader } });
  return gid;
};
export const _updateTeam = async (teamInfo: any) => {
  const { gid } = teamInfo;
  const { name, description, location } = teamInfo;
  const updateTeamInfo = { name, description, location };
  try {
    await Team.update(updateTeamInfo, { where: { gid } });
    return "success";
  } catch (error) {
    return new Error("업데이트 실패");
  }
};
export const _inviteTeam = async ({ gid, userId }) => {
  try {
    await Users.update({ gid }, { where: { uid: userId } });
    return "success";
  } catch (error) {
    return new Error("업데이트 실패");
  }
};

export const _getGroupId = async ({ teamName }) => {
  const query = {
    raw: true,
    attributes: ["gid"],
    where: { name: teamName },
  };
  return await Team.findOne(query);
};
