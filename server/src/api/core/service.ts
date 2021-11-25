import { app } from "./../../app";
import { Op, literal } from "sequelize";
import { Request } from "../../db/models/request";
import { Users } from "../../db/models/users";
import { Team } from "../../db/models/team";
import { sequelize } from "../../db/models";
import { createChatMessage, createChatRoom, createParticipant, createSingleParticipant, findChatRoomInfo, findJoinChatRooms } from "../chat/service";
import { SocketMap } from "../../webSocket/socket";
import { validateTeam } from "../team/service";
import { findUser } from "../auth/service";
import { isNumber } from "../../util/utilFunc";
import { messageType } from "../../util/type";
import { ReadTable } from "../../db/models/read";

import { QueryTypes } from "sequelize";

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

export const findAllRequest = async ({ uid }: { uid: string }) => {
  const toQuery = {
    attributes: ["from", "to", "state"],
    include: [
      {
        model: Users,
        as: "info",
        attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
      },
    ],
    where: {
      to: uid,
    },
  };
  const toResult = await Request.findAll(toQuery as object);
  const fromQuery = `select * from Request inner join Users on Request.to = Users.uid where Request.from = "${uid}"`;
  const users = await sequelize.query(fromQuery, { type: QueryTypes.SELECT });
  const fromResult = results_from(users);
  return [...toResult, ...fromResult];
};
export const isLeader = async ({ uid, gid }: { uid: string; gid: number }) => {
  const leader = await Team.findOne({ attributes: ["leader"], where: { gid } });
  console.log(leader);
  if (leader && leader.leader === uid) {
    return true;
  } else {
    return false;
  }
};

export const findAllTeamRequest = async ({ uid, gid, userData }: { uid: string; gid: number; userData: any }) => {
  const requestListToQuery = {
    attributes: ["from", "to", "state"],
    where: { to: gid },
  };
  const requestToList = await Request.findAll(requestListToQuery);
  const toList = requestToList.filter((request) => {
    if (!isNumber(request.to)) return false;
    return true;
  });
  const toQuery = ({ from }: { from: string }) => {
    return {
      attributes: ["gid", ["name", "id"], "image", "location", ["description", "info"]],
      include: [
        {
          model: Users,
          as: "member",
          attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
        },
      ],
      where: { leader: from },
    };
  };
  const promiseArr = toList.map(async (request) => {
    const from = request.from;
    const data = await Team.findOne(toQuery({ from }) as object);
    if (!data) {
      return;
    }
    return { from: request.from, to: request.to, state: "ready", info: data };
  });
  const datasTo = await Promise.all(promiseArr);
  console.log("to", datasTo);

  const requestListFromQuery = {
    attributes: ["from", "to", "state"],
    where: { from: uid },
  };
  const requestFromList = await Request.findAll(requestListFromQuery);
  const fromList = requestFromList.filter((request) => {
    if (!isNumber(request.to)) return false;
    return true;
  });
  const fromQuery = ({ to }: { to: number }) => {
    return {
      attributes: ["gid", ["name", "id"], "image", "location", ["description", "info"]],
      include: [
        {
          model: Users,
          as: "member",
          attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
        },
      ],
      where: { gid: to },
    };
  };
  const promiseArrFrom = fromList.map(async (request) => {
    const to = Number(request.to);
    const data = await Team.findOne(fromQuery({ to }) as object);
    return { from: request.from, to: request.to, state: "ready", info: data };
  });
  const datasFrom = await Promise.all(promiseArrFrom);
  console.log("from", datasFrom);
  return [...userData, ...datasTo, ...datasFrom];
};

const findOneRequest = async ({ from, to, type }: { from: string; to: string; type: string }) => {
  const toQuery = {
    attributes: ["from", "to", "state"],
    include: [
      {
        model: Users,
        as: "info",
        attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
      },
    ],
    where: {
      [Op.and]: [{ from, to }],
    },
  };
  const fromQuery = `select * from Request inner join Users on Request.to = Users.uid where Request.from = "${from}" AND Request.to="${to}"`;
  if (type === "to") {
    const toResult = await Request.findOne(toQuery as object);
    return toResult;
  }
  if (type === "from") {
    const fromResult = await sequelize.query(fromQuery, { type: QueryTypes.SELECT });
    return result_from_data(fromResult[0]);
  }
};

const findTeamRequest = async ({ from, to, type }: { from: string; to: number; type: string }) => {
  let query;
  let infoData;
  if (type === "from") {
    query = {
      attributes: ["gid", ["name", "id"], "image", "location", ["description", "info"]],
      include: [
        {
          model: Users,
          as: "member",
          attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
        },
      ],
      where: { gid: to },
    };
    infoData = await Team.findOne(query as object);
    return { from, to, state: "ready", info: infoData };
  } else {
    query = {
      attributes: ["gid", ["name", "id"], "image", "location", ["description", "info"]],
      include: [
        {
          model: Users,
          as: "member",
          attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
        },
      ],
      where: { leader: from },
    };
    infoData = await Team.findOne(query as object);
    return { from, to, state: "ready", info: infoData };
  }
};

export const results_from = (users: any[]) => {
  return users.map((user) => result_from_data(user));
};

export const result_from_data = (user: any) => {
  return {
    from: user.from,
    to: user.to,
    state: user.state,
    info: {
      id: user.uid,
      image: user.image,
      location: user.location,
      sex: user.sex,
      age: user.age,
    },
  };
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

export const addRequest = async ({ from, to }: { from: string; to: string }) => {
  return await Request.create({ from, to, state: "ready" });
};

export const sendRequest = ({ from, to }: { from: string; to: string }) => {
  if (isNumber(to)) {
    sendRequestToTeam({ from: from, to: Number(to) });
  } else {
    sendRequestToUser({ from, to });
  }
};

const sendRequestToTeam = async ({ from, to }: { from: string; to: number }) => {
  const io = app.get("io");

  const fromRequestData = await findTeamRequest({ from, to, type: "from" });
  const fromSocketId = SocketMap.get(String(from));
  io.to(fromSocketId).emit("receiveRequest", fromRequestData);
  const toLeader = String(await findLeaders(to));
  if (!SocketMap.has(toLeader)) return;
  const toRequestData = await findTeamRequest({ from, to, type: "to" });
  const toSocketId = SocketMap.get(toLeader);
  console.log(toLeader, toSocketId);
  io.to(toSocketId).emit("receiveRequest", toRequestData);
};

const findLeaders = async (gid: number) => {
  const query = {
    attributes: ["leader"],
    where: { gid },
  };
  const info = await Team.findOne(query);
  return info?.getDataValue("leader");
};

const sendRequestToUser = async ({ from, to }: { from: string; to: string }) => {
  const io = app.get("io");
  const fromSocketId = SocketMap.get(from);
  const fromRequestData = await findOneRequest({ from, to, type: "from" });
  io.to(fromSocketId).emit("receiveRequest", fromRequestData);
  if (!SocketMap.has(to)) return;

  const toSocketId = SocketMap.get(to);
  const toRequestData = await findOneRequest({ from, to, type: "to" });
  io.to(toSocketId).emit("receiveRequest", toRequestData);
};

export const validationTeamAndUser = async (to: string) => {
  if (isNumber(to)) {
    return await validateTeam({ gid: Number(to) });
  }
  return await findUser({ uid: to });
};

export const _denyRequest = async ({ from, to }: { from: string; to: string }) => {
  if (isNumber(to)) {
    denyRequestTeam({ from: Number(from), to: Number(to) });
  } else {
    denyRequestUser({ from, to });
  }
};

const denyRequestTeam = async ({ from, to }: { from: number; to: number }) => {
  await deleteRequest({ from: String(from), to: String(to) });
};

const denyRequestUser = async ({ from, to }: { from: string; to: string }) => {
  await deleteRequest({ from, to });
  const io = app.get("io");
  const toSocketId = SocketMap.get(to);
  io.to(toSocketId).emit("receiveDenyRequest", { from, to });
  if (!SocketMap.has(from)) return;
  const fromSocketId = SocketMap.get(from);
  io.to(fromSocketId).emit("receiveDenyRequest", { from, to });
};

const deleteRequest = async ({ from, to }: { from: string; to: string }) => {
  return await Request.destroy({
    where: {
      [Op.and]: [{ from, to }],
    },
  });
};

export const _acceptRequest = async ({ from, to }: { from: string; to: string }) => {
  console.log("is number", isNumber(to));
  console.log(from, to);
  if (isNumber(to)) {
    acceptRequestTeam({ from, to: Number(to) });
  } else {
    acceptRequestUser({ from, to });
  }
};

const acceptRequestTeam = async ({ from, to }: { from: string; to: number }) => {
  await deleteRequest({ from, to: String(to) });
  const createdChatRoom = await createChatRoom(); // 방생성
  const chatRoomId = createdChatRoom.get({ plain: true }).chatRoomId; // id 가져오기
  const members = await createParticipants({ from, to, chatRoomId });
  const membersArr = members.map((member: any) => member.dataValues);
  await createChatMessage({ chatRoomId, message: makeMessageObject({ from, to: from, message: `${from}가 채팅을 수락했습니다.` }) });
  const chatRoomData = await findChatRoomInfo({ chatRoomId, type: "team" });
  console.log("chatRoomData", chatRoomData);
  const io = app.get("io");

  //io.to(fromSocketId).emit("receiveAcceptRequest", { chat: chatRoomData, from, to });
  membersArr.forEach((member: any) => {
    if (!SocketMap.has(String(member.id))) return;
    const toSocketId = SocketMap.get(String(member.id));
    io.to(toSocketId).emit("receiveAcceptRequest", { chat: { ...chatRoomData, member: membersArr }, from, to });
  });
};

const acceptRequestUser = async ({ from, to }: { from: string; to: string }) => {
  await deleteRequest({ from, to });
  const createdChatRoom = await createChatRoom();
  const chatRoomId = createdChatRoom.get({ plain: true }).chatRoomId;
  await createParticipant({ from, to, chatRoomId });
  await createChatMessage({ chatRoomId, message: makeMessageObject({ from, to, message: `${to}가 채팅을 수락했습니다.` }) });
  const chatRoomData = await findChatRoomInfo({ chatRoomId, type: "user" });
  // from 에게 보내기 시작
  const io = app.get("io");
  const fromSocketId = SocketMap.get(from);
  io.to(fromSocketId).emit("receiveAcceptRequest", { chat: chatRoomData, from, to });
  // to 에게 보내기 시작
  if (!SocketMap.has(to)) return;
  const toSocketId = SocketMap.get(to);
  io.to(toSocketId).emit("receiveAcceptRequest", { chat: chatRoomData, from, to });
};

const makeMessageObject = ({ from, to, message }: { from: string; to: string; message: string }): messageType => {
  return {
    from: to,
    message,
  };
};

const createParticipants = async ({ from, to, chatRoomId }: { from: string; to: number; chatRoomId: number }) => {
  const toTeamInfo = (await findTeamMembers({ gid: to })) as any;
  const fromTeamInfo = (await findTeamMembersByLeader({ leader: from })) as any;
  const members = [...(toTeamInfo as any).dataValues.member, ...(fromTeamInfo as any).dataValues.member];
  const promiseArr = members.map((member: any) => {
    return createSingleParticipant({ uid: (member as any).dataValues.id, chatRoomId });
  });
  await Promise.all(promiseArr);
  return members;
};

const findTeamMembers = async ({ gid }: { gid: number }) => {
  const query = {
    attributes: ["gid", ["name", "id"], "image", "location", ["description", "info"]],
    include: [
      {
        model: Users,
        as: "member",
        attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
      },
    ],
    where: { gid },
  };
  const infoData = await Team.findOne(query as object);
  return infoData;
};

const findTeamMembersByLeader = async ({ leader }: { leader: string }) => {
  const query = {
    attributes: ["gid", ["name", "id"], "image", "location", ["description", "info"]],
    include: [
      {
        model: Users,
        as: "member",
        attributes: [["uid", "id"], "image", "location", "sex", "age", "info"],
      },
    ],
    where: { leader },
  };
  return await Team.findOne(query as object);
};
