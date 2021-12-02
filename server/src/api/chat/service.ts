import { ReadTable } from "../../db/models/read";
import { Chat } from "../../db/models/chat";
import { ChatRoom } from "../../db/models/chatRoom";
import { Participant, ParticipantAttributes } from "../../db/models/participant";
import { Users } from "../../db/models/users";

interface infoAttribute extends ParticipantAttributes {
  [key: string]: string | number | null | undefined;
}

export const findChatRoomsInfo = async ({ uid }: { uid: string }) => {
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

export const findChatRoomInfo = async ({ chatRoomId, type }: { chatRoomId: number; type: string }) => {
  const query = ({ chatRoomId }: { chatRoomId: number }) => {
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
      where: { chatRoomId },
      attribute: [],
    };
  };
  const chatRoomInfo = await Participant.findAll(query({ chatRoomId }));
  const filteredMemberData = (chatRoomInfo as unknown as infoAttribute[]).map((member: infoAttribute) => {
    return {
      id: member["User.uid"],
      image: member["User.image"],
      location: member["User.location"],
      sex: member["User.sex"],
      age: member["User.age"],
      info: member["User.info"],
    };
  });
  const chatMessage = await findMessages(chatRoomId, 0);
  if (type === "team") {
    return { chatRoomId, chatMessage };
  }
  return { chatRoomId, member: filteredMemberData, chatMessage };
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
  const query = {
    raw: true,
    attributes: [["uid", "from"], "message", ["src", "source"]],
    limit: 10,
    where: { chatRoomId: chatRoomId },
    offset: 10 * index,
    order: [["chatId", "DESC"]],
  };
  const data = await Chat.findAll(query as object);
  return data.reverse();
};

export const createParticipant = async ({ from, to, chatRoomId }: { from: string; to: string; chatRoomId: number }) => {
  const promiseArr = [Participant.create({ uid: to, chatRoomId }), Participant.create({ uid: from, chatRoomId })];
  return await Promise.all(promiseArr);
};

export const createSingleParticipant = async ({ uid, chatRoomId }: { uid: string; chatRoomId: number }) => {
  return await Participant.create({ uid, chatRoomId });
};

export const createReadRow = async ({ chatId, chatRoomId, uid, isRead }: { chatId: number; chatRoomId: number; uid: string; isRead: boolean }) => {
  ReadTable.create({ chatId, chatRoomId, uid, isRead });
};

export const findParticipants = async ({ chatRoomId }: { chatRoomId: number }) => {
  return await Participant.findAll({ raw: true, where: { chatRoomId } });
};

export const handleMessageRead = async ({ uid, chatRoomId }: { uid: string; chatRoomId: number }) => {
  return await ReadTable.update({ isRead: true }, { where: { uid, chatRoomId } });
};
