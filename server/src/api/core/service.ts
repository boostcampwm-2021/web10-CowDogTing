import { Op, col } from "sequelize";
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
        attributes: [["uid", "id"], "image", "location", "sex", "age"],
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
    attributes: [["uid", "id"], "image", "location", "sex", "age", "gid"],
    // attributes: [["uid", "id"], "image", "location", "sex", "age", "info", "gid"],
    where: { uid },
  };
  return await Users.findOne(query as object);
};

export const findAllProfile = async (person: number, index: number) => {
  let query;
  if (person === 1) {
    query = {
      attributes: [["uid", "id"], "image", "location", "sex", "age"],
      offset: 10 * index,
      limit: 10,
      // attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
    };
    return await Users.findAll(query);
  } else {
    query = {
      attributes: [["id", "id"], "image", "location", ["description", "info"]],
      offset: 10 * index,
      limit: 10,
    };
    const teamInfos = await Team.findAll(query as object);
    const teamProfiles = await Promise.all(
      teamInfos.map(async (teamInfo) => {
        return { ...teamInfo["dataValues"], member: await getMember(teamInfo) };
      })
    );
    return teamProfiles;
  }
};

const getMember = async (teamInfo) => {
  const gid = teamInfo.dataValues.id;
  const query = {
    attributes: [["uid", "id"], "image", "location", "sex", "age"],
    where: { gid },
  };
  const memberData = await Users.findAll(query as object);
  return memberData;
};
