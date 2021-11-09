import { Op } from "sequelize";
import { Request } from "./../../models/request";
import { Chat } from "../../models/chat";
import { findJoinChatRooms } from "../chat/service";
import { Users } from "../../models/users";

export const findImage = async ({ imageID }) => {
  // imageID 에 대한 db 값 가져오기
};

export const findChatRoomNotReadNum = async ({ uid }) => {
  // uid로 chatRoom의 id값 가져와서
  // join으로 message 가져오는데
  // read : false 인 애들 만 가져와서
  // 숫자로 변환해서 return 해주기
  const joinCathRoom = await findJoinChatRooms({ uid }); // chat의 service와 중복 => 나중에 공통으로
  console.log(joinCathRoom);
  const chatList = await Promise.all(
    joinCathRoom.map(async (RoomNum) => {
      return {
        ...RoomNum,
        num: await findAllChat(RoomNum),
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
        // attributes: ["uid", "image", "location", "sex", "age", "info"]
      },
    ],
    where: {
      [Op.or]: [{ from: uid }, { to: uid }],
    },
  };
  const requests = await Request.findAll(query);

  return requests;
};
