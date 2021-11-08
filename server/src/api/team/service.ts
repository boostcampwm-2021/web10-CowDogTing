import { Team } from "../../models/team";
export const findTeam = async ({ gid }) => {
  // const query = {
  //   where: { gid },
  //   include: {
  //     model: Users,
  //     attributes: ["uid", "location"],
  //     where: { gid },
  //   },
  // };
  // return await Team.findOne(query);
};
/*
gid로 해당하는 Team에서 findOne
include로 유저에서 해당 gid를 가지는 유저들을 findAll
유저 데이터를 가공해서 배열로 담아줌.
return info에 추가해줌.
*/
export const _createTeam = async ({ teamInfo }) => {
  return await Team.create({ ...teamInfo });
}; //디비에 teamInfo로 추가해줌
export const _updateTeam = async ({ teamInfo }) => {
  const gid = teamInfo.gid;
  return await Team.update({ ...teamInfo }, { where: { gid } });
}; //teamInfo의 gid를 통해 찾아서 해당하는 팀의 정보를 업데이트 해줌
export const _inviteTeam = async ({ gid, inviteID }) => {}; // inviteID로 user에서 해당하는 user를 찾고 gid를 추가해준다.
