import { Chat } from "../../db/models/chat";
import { ChatRoom } from "../../db/models/chatRoom";
import { Participant } from "../../db/models/participant";
import { Users } from "../../db/models/users";

export const findChatRoomInfo = async ({ uid }) => {
  // uid로 chatRoom 정보 가져오고
  // join으로 chatRoom에 대한 user 정보 가져오기
  const query = ({ chatRoomId }) => {
    return {
      raw: true,
      include: [
        {
          model: Users,
        },
        {
          model: ChatRoom,
        },
      ],
      where: chatRoomId,
      attribute: [],
    };
  };
  const joinChatRooms = await findJoinChatRooms({ uid });
  const promiseArr = joinChatRooms.map((chatRoomId) => {
    return Participant.findAll(query({ chatRoomId }));
  });
  const memberData = await Promise.all(promiseArr);
  const filteredMemberData = memberData.map((chatRoomMember) => {
    return chatRoomMember.map((member) => {
      return {
        id: member["User.uid"],
        image: member["User.image"],
        location: member["User.location"],
        sex: member["User.sex"],
        age: member["User.age"],
        info: member["User.info"],
      };
    });
  });

  // chatMessage
  const datas = joinChatRooms.map((chatRoomId, idx) => {
    return { ...chatRoomId, member: filteredMemberData[idx] };
  });
  const promiseMessages = joinChatRooms.map((chatRoomId, idx) => {
    return findMessages(chatRoomId.chatRoomId, 0);
  });
  const chatMessages = await Promise.all(promiseMessages);
  const filteredData = datas.map((unFildteredData, idx) => {
    return { ...unFildteredData, chatMessage: chatMessages[idx] };
  });

  return filteredData;
};

export const findJoinChatRooms = async ({ uid }) => {
  const query = {
    attributes: ["chatRoomId"],
    where: { uid },
    raw: true,
  };
  const datas = await Participant.findAll(query);
  return datas;
};

export const findMessages = async (chatRoomId, index: number) => {
  // chatRoomId에 대한 채팅들 모두 가져오기
  const query = {
    raw: true,
    attributes: ["uid", "message", "src", "isRead"],
    limit: 10,
    where: { chatRoomId: chatRoomId },
    offset: 10 * index,
    order: [["chatId", "DESC"]],
  };
  console.log(index * 10);
  const datas = await Chat.findAll(query as object);
  const data = datas.map((item) => {
    return {
      from: item.uid,
      message: item.message,
      source: item.src,
      read: item.isRead,
    };
  });
  return data;
};
