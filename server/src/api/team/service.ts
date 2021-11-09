/* eslint-disable no-shadow */
import { Team } from "../../models/team";
import { Users } from "../../models/users";

/**
 *
 * @param param0 => { gid }
 * @returns  => {
  "image": "asfdadsf",
  "id": "팀명",
  "info": "asdfsafd",
  "location": "우만동",
  "age": 23,
  "leader": false,
  "sex": "male",
  "member": [
              {
                "id": "yj",
                "image": "Image",
                "location": "우만동",
                "age": 23,
                "sex": "male",
                "info": "안녕하세요"
              },
              {
                "id": "hansory",
                "image": "Image",
                "location": "우만동",
                "age": 23,
                "sex": "male",
                "info": "안녕하세요"
              }
            ]
          }
 * team 데이터로 leader => string 있어야할듯,
 * include에 2개 이상 넣을때 왜 에러나느지 모르겠음,,
 * 
 */
export const findTeam = async ({ gid }) => {
  const query = {
    raw: true,
    where: { gid },
    attributes: ["name", "info", "location", "image", "leader"],
    include: [
      {
        raw: true,
        model: Users,
        attributes: ["uid", "location", "image", "age", "sex"],
        where: { gid },
        include: {
          model: Image,
          attributes: ["image"],
          where: { image },
        },
      },
      {
        raw: true,
        model: Image,
        attributes: ["image"],
        where: { image },
      },
    ],
  };

  const data = await Team.findOne(query);

  const { Users, name: id, info, location, Image, leader } = data;

  let teamSex: string;
  let teamAge: number = 0;

  const member = Users.map((user) => {
    const { uid: id, location, Image, age, sex } = user;

    teamAge += age;
    if (leader === id) teamSex = sex;

    return {
      id,
      location,
      image: Image[0].image,
      age,
      sex,
    };
  });

  return {
    id,
    image: Image[0].image,
    info,
    location,
    age: Math.floor(teamAge / member.length),
    leader,
    sex: teamSex,
    member,
  };
};
/*
gid로 해당하는 Team에서 findOne
include로 유저에서 해당 gid를 가지는 유저들을 findAll
유저 데이터를 가공해서 배열로 담아줌.
return info에 추가해줌.
*/
export const _createTeam = async ({ teamInfo }) => {
  return await Team.create({ ...teamInfo });
}; // 디비에 teamInfo로 추가해줌
export const _updateTeam = async ({ teamInfo }) => {
  const { gid } = teamInfo;
  return await Team.update({ ...teamInfo }, { where: { gid } });
}; // teamInfo의 gid를 통해 찾아서 해당하는 팀의 정보를 업데이트 해줌
export const _inviteTeam = async ({ gid, inviteID }) => {}; // inviteID로 user에서 해당하는 user를 찾고 gid를 추가해준다.
