import { Chat } from "../../db/models/chat";
import { ChatRoom } from "../../db/models/chatRoom";
import { Participant, ParticipantAttributes } from "../../db/models/participant";
import { Users } from "../../db/models/users";

interface infoAttribute extends ParticipantAttributes {
  [key: string]: string | number | null | undefined;
}

export const findChatRoomInfo = async ({ uid }: { uid: string }) => {
  const query = ({ chatRoomId }: { chatRoomId: Participant }) => {
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
    return (chatRoomMember as unknown as infoAttribute[]).map((member: infoAttribute) => {
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

export const findJoinChatRooms = async ({ uid }: { uid: string }) => {
  const query = {
    attributes: ["chatRoomId"],
    where: { uid },
    raw: true,
  };
  const datas = await Participant.findAll(query);
  return datas;
};

export const findMessages = async (chatRoomId: number, index: number) => {
  // chatRoomId에 대한 채팅들 모두 가져오기
  const query = {
    raw: true,
    attributes: [["uid", "from"], "message", ["src", "source"], ["isRead", "read"]],
    limit: 10,
    where: { chatRoomId: chatRoomId },
    offset: 10 * index,
    order: [["chatId", "DESC"]],
  };
  const data = await Chat.findAll(query as object);
  return data;
};
