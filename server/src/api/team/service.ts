<<<<<<< HEAD
import { Team } from "../../../models/team";
=======
import { Team } from "../../models/team";
import { Users } from "../../models/users";
>>>>>>> d941f93... Feat : 팀 정보 획득 API 구현 [close #94]
export const findTeam = async ({ gid }) => {
  const query = {
    raw: true,
    where: { gid },
    include: [
      {
        model: Users,
        attributes: ["uid", "image", "location", "age", "sex"],
      },
    ],
  };
  const teamInfos = await Team.findAll(query);
  const memberInfo = teamInfos.map((info) => {
    return { id: info["User.uid"], image: info["User.image"], location: info["User.location"], age: info["User.age"], sex: info["User.sex"] };
  });
  const teamInfo = teamInfos[0];
  const filteredTeamInfo = { image: teamInfo.image, id: teamInfo.name, info: teamInfo.description, location: teamInfo.location, leader: teamInfo.leader, member: memberInfo };
  return filteredTeamInfo;
};

export const _createTeam = async ({ teamInfo }) => {
  return await Team.create(teamInfo);
};
export const _updateTeam = async ({ teamInfo }) => {
  const gid = teamInfo.gid;
  return await Team.update({ ...teamInfo }, { where: { gid } });
};
export const _inviteTeam = async ({ gid, inviteID }) => {};
