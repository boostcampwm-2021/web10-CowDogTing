import { Op } from "sequelize";
import { Chat } from "../../models/chat";
import { Users } from "../../models/users";

/**
 *
 * @param param0
 * @returns
 * [get] /api/chat/messages
 * raw: true 를 넣어주면 dataValues가 바로 나온다고함
 * User Table에 chatRoomId 필요할 것 같음
 * Image Table 필요한 것 같음
 * image : string => number
 * 아래 query문 결과값 34Line datas는 내 추측이라 틀릴수도
 * by jin-Pro
 */
export const findChatRoomInfo = async ({ uid }) => {
  const query = {
    raw: true,
    attributes: ["chatRoomId"],
    where: { uid },
    include: [
      {
        raw: true,
        model: Users,
        where: { chatRoomId },
        attributes: ["uid", "image", "location", "sex", "age", "info"],
        include: [
          {
            model: Image,
            where: { id: image },
            attributes: ["image"],
          },
        ],
      },
    ],
  };

  const datas = await Users.findAll(query);
  // datas =
  // {
  //   chatRoomID : 1,
  //   Users : [{
  //     uid : '영진',
  //     image : 0,
  //     location : '경기도',
  //     sex : 'male',
  //     age : 25,
  //     info : 'hello hello',
  //     Image : [{
  //       image : 'asdfasdf'
  //     }]
  //   },{
  //     uid : '영진',
  //     image : 0,
  //     location : '경기도',
  //     sex : 'male',
  //     age : 25,
  //     info : 'hello hello',
  //     Image : [{
  //       image : 'asdfasdf'
  //     }]
  //   }]
  // }
  const data = datas.map((item) => {
    const { uid: id, Image, location, sex, age, info } = item;
    return {
      id,
      image: Image[0].image,
      location,
      sex,
      age,
      info,
    };
  });

  return data;
};

/**
 *
 * @param param0
 * @returns
 * [get] : /api/chat/messages
 * source : image가 맞는지?? 맞다면 string => number
 * 또한, 명세서에는 read가 있는데 굳이 필요없을것 같지 않나??
 * 또한, index로 페이지 네이션 해야하는데 방법이 떠오르질 않음
 * id값이 큰게 가장 최신이라 내림차순으로 받아와야 할 것 같은데
 * 혹시 index가 client에서 받아온 chat중 가장 오래된 id값인건가??
 * 그렇다면, 그 id 보다 작고(제일 처음 받은 id가 큰 값이기때문)
 * 내림차순으로 10개를 뽑아오는거라면 이해가 된다.
 * Op.lt ( 미만 )
 */
export const findMessages = async ({ chatRoomId, index }) => {
  // chatRoomId에 대한 채팅들 모두 가져오기
  const query = {
    raw: true,
    attributes: ["uid", "message", "source", "chatId"],
    order: ["chatId", "DESC"],
    limit: 10,
    where: { chatRoomId, chatId: { [Op.lt]: index } },
    include: [
      {
        raw: true,
        model: Image,
        where: { id: source },
      },
    ],
  };

  // datas = [{
  //   uid : '영진',
  //   message : 'hihi',
  //   source : 0,
  //   chatId : 10,
  //   Image : [{
  //     image : 'ImagePath'
  //   }],
  // },{
  //   uid : '영진',
  //   message : 'hihiasfd',
  //   source : 0,
  //   chatId : 9,
  //   Image : [{
  //     image : 'ImagePath'
  //   }],
  // }]
  const datas = await Chat.findAll(query);
  const data = datas.map((item) => {
    const { uid: from, message, chatId: id, Image } = item;
    return {
      from,
      message,
      id,
      image: Image[0].image,
    };
  });

  return data;
};
