import { Op, literal } from "sequelize";
import { Request } from "../../db/models/request";
import { Chat } from "../../db/models/chat";
import { findJoinChatRooms } from "../chat/service";
import { Users } from "../../db/models/users";
import { Team } from "../../db/models/team";
import { sequelize } from "../../db/models";
const { QueryTypes } = require("sequelize");

export const findImage = async ({ imageID }) => {
  // imageID 에 대한 db 값 가져오기
};

export const findChatRoomNotReadNum = async ({ uid }) => {
  const joinCathRoom = await findJoinChatRooms({ uid }); // chat의 service와 중복 => 나중에 공통으로
  console.log(joinCathRoom);
  const chatList = await Promise.all(
    joinCathRoom.map(async (RoomNum) => {
      return {
        ...RoomNum,
        notReadNum: await findAllChat(RoomNum),
      };
    })
  );
  return chatList;
};

const findAllChat = async ({ chatRoomId }) => {
  const query = {
    where: {
      isRead: 0,
      chatRoomId: chatRoomId,
    },
  };
  return await Chat.count(query);
};

export const findAllRequest = async ({ uid }) => {
  //from: 나  -> 내가 보낸 요청 -> to의 정보  => 항상 from의 정보 gdgd => gdgd 정보 나옴
  //to : 나 -> 나에게 온 요청  -> from 의 정보  ㅇㅇ 맞음
  const query_to = {
    attributes: ["from", "to", "state"],
    include: [
      {
        model: Users,
        as: "info",
        attributes: [["uid", "id"], "image", "location", "sex", "age", "info"], // 나중에 info 컬럼 추가시 해당 열 사용
      },
    ],
    where: {
      to: uid,
    },
  };
  //to가 외래키 -> from : gdgd  -> to 연결되는거 아님?
  // const query_from = {
  //   attributes: ["from", "to", "state"],
  //   include: [
  //     {
  //       model: Users,
  //       as: "info",
  //       attributes: [["uid", "id"], "image", "location", "sex", "age"],
  //       where: {
  //       },
  //     },
  //   ],
  //   where: {
  //     from: uid,
  //   },
  // };
  const query_from = `select * from Request inner join Users on Request.to = Users.uid where Request.from = "${uid}"`;
  const result_to = await Request.findAll(query_to as object);
  console.log(result_to);
  const users = await sequelize.query(query_from, { type: QueryTypes.SELECT });
  const filtered = result_from(users);
  console.log(filtered);
  return [...result_to, ...filtered];
};

export const result_from = (users: any[]) => {
  return users.map((user) => {
    return {
      from: user.from,
      to: user.to,
      state: user.state,
      info: {
        id: user.uid,
        image: user.image,
        location: user.location,
        sex: user.sex,
        age: user.age,
      },
    };
  });
};

export const findUserInfo = async ({ uid }) => {
  const query = {
    attributes: [["uid", "id"], "image", "location", "sex", "age", "info", "gid"],
    where: { uid },
  };
  return await Users.findOne(query as object);
};

export const findAllProfile = async (person: number, index: number) => {
  let query;
  console.log(person);
  if (person === 1) {
    console.log(person);
    console.log(index);
    query = {
      raw: true,
      attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
      offset: 10 * index,
      limit: 10,
    };
    return await Users.findAll(query);
  } else {
    const teamIds = await findTeam(person);
    query = {
      raw: true,
      attributes: [["gid", "id"], "image", "location", ["description", "info"]],
      where: { gid: { [Op.or]: teamIds } },
      offset: 10 * index,
      limit: 10,
    };
    const teamInfos = await Team.findAll(query as object);
    console.log(teamInfos);
    return teamInfos;
  }
};

const findTeam = async (person) => {
  const query = {
    raw: true,
    attributes: ["gid"],
    include: [
      {
        model: Users,
        as: "member",
        attributes: [],
      },
    ],
    group: ["member.gid"],
    having: literal(`COUNT(member.uid) = ${person}`),
  };
  const resultArr = await Team.findAll(query as object);
  const teamId = resultArr.map((result) => {
    return result.gid;
  });
  console.log(teamId);
  return teamId;
};

export const updateUser = async (oldId: string, { uid, location, age, info }: { uid: string; location: string; age: number; info: string }) => {
  await Users.update({ uid, location, age, info }, { where: { uid: oldId } });
};
