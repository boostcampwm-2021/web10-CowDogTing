import { Chat } from "../../../models/chat";
import { Users } from "../../../models/users";

export const findChatRoomInfo = async ({ uid }) => {
  // uid로 chatRoom 정보 가져오고
  // join으로 chatRoom에 대한 user 정보 가져오기
  const query = {
    attributes: ["chatRoomId"],
    where: { uid },
    include: [
      {
        model: Users,
        where: { chatRoomId },
      },
    ],
  };

  const datas = await Users.findAll(query);
  const data = datas.filter((item) => {});

  return data;
};
export const findMessages = async ({ chatRoomId }) => {
  // chatRoomId에 대한 채팅들 모두 가져오기
  const query = {
    attributes: ["uid", "message", "source"],
    order: ["chatId", "ASC"],
    limit: 10,
    where: { chatRoomId },
    include: [
      {
        // model: Image,
        // where: { id : source },
      },
    ],
  };

  const datas = await Chat.findAll(query);
  // data 가공 필요 => data 콘솔로 찍어봐야 할 수 있을 것 같음
  const data = datas.map((item) => {
    // return {from : item.uid, message : item.message, source : item.Image.image};
  });

  return data;
};
