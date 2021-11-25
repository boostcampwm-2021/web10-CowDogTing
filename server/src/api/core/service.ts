import { Op, literal } from "sequelize";
import { Users } from "../../db/models/users";
import { Team } from "../../db/models/team";
import { ReadTable } from "../../db/models/read";
import { findJoinChatRooms } from "../chat/service";
import { isNumber } from "../../util/utilFunc";

export const updateProfileImage = async ({ image, id }: { image: string; id: string }) => {
  if (isNumber(id)) {
    return await updateTeamProfileImage({ image, id: Number(id) });
  } else {
    return await updateUserProfileImage({ image, id });
  }
};

const updateTeamProfileImage = async ({ image, id }: { image: string; id: number }) => {
  return await Team.update({ image }, { where: { gid: id } });
};

const updateUserProfileImage = async ({ image, id }: { image: string; id: string }) => {
  return await Users.update({ image }, { where: { uid: id } });
};
export const findChatRoomNotReadNum = async ({ uid }: { uid: string }) => {
  const joinCathRoom = await findJoinChatRooms({ uid });
  const chatList = await Promise.all(
    joinCathRoom.map(async (RoomNum) => {
      return {
        ...RoomNum,
        notReadNum: await findAllChat({ chatRoomId: RoomNum.chatRoomId, uid }),
      };
    }),
  );
  return chatList;
};

const findAllChat = async ({ chatRoomId, uid }: { chatRoomId: number; uid: string }) => {
  const query = {
    where: {
      uid,
      isRead: 0,
      chatRoomId: chatRoomId,
    },
  };
  return await ReadTable.count(query);
};

export const findUserInfo = async ({ uid }: { uid: string }) => {
  const query = {
    attributes: [["uid", "id"], "image", "location", "sex", "age", "info", "gid"],
    where: { uid },
  };
  return await Users.findOne(query as object);
};

export const findAllProfile = async (person: number, index: number, myId: string, age: number | object, sex: string | object, location: string | object) => {
  let query;
  if (typeof age === "number") {
    age = { [Op.gte]: Number(age), [Op.lt]: Number(age) + 10 };
  }
  if (person === 1) {
    query = {
      raw: true,
      attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
      where: { uid: { [Op.ne]: myId }, age, sex, location },
      offset: 10 * index,
      limit: 10,
      logging: true,
    };
    const data = await Users.findAll(query as object);
    return data;
  } else {
    const teamIds = await findTeam(person, myId);
    query = {
      attributes: ["gid", ["name", "id"], "image", "location", ["description", "info"]],
      include: [
        {
          model: Users,
          as: "member",
          attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
          where: { sex: sex, age: age },
        },
      ],
      where: { gid: { [Op.in]: teamIds }, location: location },
      offset: 10 * index,
      limit: 10,
      logging: true,
    };
    const data = await Team.findAll(query as object);
    return data;
  }
};

const findTeam = async (person: number, myId: string) => {
  const query = {
    raw: true,
    attributes: ["gid"],
    include: [
      {
        model: Users,
        as: "member",
        attributes: [],
      },
    ],
    where: literal(`Team.gid != (SELECT gid from Users WHERE uid='${myId}')`),
    group: ["member.gid"],
    having: literal(`COUNT(member.uid) = ${person}`),
  };
  const resultArr = await Team.findAll(query as object);
  const teamId = resultArr.map((result) => {
    return result.gid;
  });
  return teamId;
};

export const updateUser = async (oldId: string, { uid, location, age, info }: { uid: string; location: string; age: number; info: string }) => {
  await Users.update({ uid, location, age, info }, { where: { uid: oldId } });
};
