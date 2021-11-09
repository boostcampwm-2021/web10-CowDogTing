import { Chat } from "../../models/chat";
import { ChatRoom } from "../../models/chatRoom";
import { Participant } from "../../models/participant";
import { Users } from "../../models/users";

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
      ],
      where: chatRoomId,
      attribute: [],
    };
  };

  const joinChatRooms = await findJoinChatRooms({ uid });

  const promiseArr = joinChatRooms.map((chatRoomId, idx) => {
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

  const datas = joinChatRooms.map((chatRoomId, idx) => {
    return { ...chatRoomId, member: filteredMemberData[idx] };
  });
  return datas;
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
