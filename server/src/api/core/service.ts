import { sequelize } from "./../../models/index";
import { Op } from "sequelize";
import { Request } from "./../../models/request";
import { Chat } from "../../models/chat";
import { findJoinChatRooms } from "../chat/service";
import { Users } from "../../models/users";

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
  const requests = await Request.findAll(query);

  return requests;
};

export const findUserInfo = async ({ uid }) => {
  const query = {
    attributes: [["uid", "id"], "image", "location", "sex", "age"],
    where: { uid },
  };
  const userInfo = await Users.findOne(query as object);
  return userInfo;
};
