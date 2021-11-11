import { Op } from "sequelize";
import { Request } from "../../db/models/request";
import { Chat } from "../../db/models/chat";
import { findJoinChatRooms } from "../chat/service";
import { Users } from "../../db/models/users";
import { Team } from "../../db/models/team";

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
  const query = {
    attributes: ["from", "to", "state"],
    include: [
      {
        model: Users,
        as: "info",
        attributes: ["uid", "image", "location", "sex", "age"],
        // attributes: ["uid", "image", "location", "sex", "age", "info"] // 나중에 info 컬럼 추가시 해당 열 사용
      },
    ],
    where: {
      [Op.or]: [{ from: uid }, { to: uid }],
    },
  };
  return await Request.findAll(query);
};

export const findUserInfo = async ({ uid }) => {
  const query = {
    attributes: ["uid", "image", "location", "sex", "age", "gid"],
    // attributes: [["uid", "id"], "image", "location", "sex", "age", "info", "gid"],
    where: { uid },
  };
  return await Users.findOne(query as object);
};

export const findAllProfile = async (people) => {
  let query;
  if (people == 1) {
    query = {
      attributes: [["uid", "id"], "image", "location", "sex", "age"],
      // attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
    };
    return await Users.findAll(query);
  } else {
    query = {
      attributes: [["gid", "id"], "image", "location", ["description", "info"]],
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
