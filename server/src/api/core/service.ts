import { Chat } from "../../models/chat";
import { ChatRoom } from "../../models/chatRoom";
import { Users } from "../../models/users";

/**
 *
 * @param param0 => {imageId}
 * @returns  =>{
                  "image": "string"
                }
 *
 * /core/controller/getImage
 */
export const findImage = async ({ imageId }) => {
  const query = {
    raw: true,
    attributes: ["image"],
    where: { id: imageId },
  };

  const data = await Image.findOne(query);
  return data;
};

/**
 *
 * @param param0 => { uid }
 * @returns =>{
                "id": "yj",
                "image": 33,
                "location": "우만동",
                "sex": "male",
                "age": 25,
                "info": "안녕하세요"
              }
 *
 * /core/controller/getUserInfo
 */
export const findUserInfo = async ({ uid }) => {
  const query = {
    raw: true,
    attributes: ["uid", "image", "location", "sex", "age", "info"],
    where: { uid },
    include: {
      model: Image,
      where: { id: image },
      attributes: ["image"],
    },
  };

  const data = await Users.findOne(query);
  return data;
};

/**
 *
 * @param param0 => { uid }
 * @returns =>[
                {
                  "chatRoomID": 1,
                  "notReadNum": 3
                },
                {
                  "chatRoomID": 2,
                  "notReadNum": 2
                }
              ]
 * /core/controller/getJoinChatInfo
 */
export const findChatRoomNotReadNum = async ({ uid }) => {
  const query = {
    raw: true,
    attributes: ["chatRoomId"],
    where: { uid },
    include: [
      {
        raw: true,
        model: Chat,
        where: { chatRoomId, Read: false },
        attributes: ["chatId"],
      },
    ],
  };

  // datas = [
  //   {
  //     chatRoomId: 0,
  //     Chat: [
  //       {
  //         chatId: 1,
  //       },
  //       {
  //         chatId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     chatRoomId: 0,
  //     Chat: [
  //       {
  //         chatId: 1,
  //       },
  //       {
  //         chatId: 2,
  //       },
  //     ],
  //   },
  // ];
  const datas = await ChatRoom.findAll(query);
  const data = datas.map((item) => {
    const { chatRoomId, Chat } = item;
    return {
      chatRoomId,
      notReadNum: Chat.length,
    };
  });

  return data;
};
