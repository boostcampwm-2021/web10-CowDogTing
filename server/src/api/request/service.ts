import { Op, QueryTypes } from "sequelize";
import { Team } from "../../db/models/team";
import { sequelize } from "../../db/models";
import { Request } from "../../db/models/request";
import { Users } from "../../db/models/users";
import { app } from "./../../bin/www";
import { pubClient } from "../../webSocket/socket";
import { ChatRoom } from "../../db/models/chatRoom";
import { createChatMessage, findUser } from "../util";
import { createParticipant, createSingleParticipant, findChatRoomInfo } from "../chat/service";
import { messageType } from "../../util/type";
import { isNumber } from "../../util/utilFunc";

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

export const validationTeamAndUser = async (to: string) => {
  if (isNumber(to)) {
    return await validateTeam({ gid: Number(to) });
  }
  return await findUser({ uid: to });
};

export const isLeader = async ({ uid, gid }: { uid: string; gid: number }) => {
  const leader = await Team.findOne({ attributes: ["leader"], where: { gid } });
  if (leader && leader.leader === uid) {
    return true;
  } else {
    return false;
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

export const sendRequest = ({ from, to }: { from: string; to: string }) => {
  if (isNumber(to)) {
    sendRequestToTeam({ from: from, to: Number(to) });
  } else {
    sendRequestToUser({ from, to });
  }
};

export const _denyRequest = ({ from, to }: { from: string; to: string }) => {
  if (isNumber(to)) {
    denyRequestTeam({ from, to: Number(to) });
  } else {
    denyRequestUser({ from, to });
  }
};

export const _acceptRequest = ({ from, to }: { from: string; to: string }) => {
  if (isNumber(to)) {
    acceptRequestTeam({ from, to: Number(to) });
  } else {
    acceptRequestUser({ from, to });
  }
};
export const addRequest = async ({ from, to }: { from: string; to: string }) => {
  return await Request.create({ from, to, state: "ready" });
};

const sendRequestToTeam = async ({ from, to }: { from: string; to: number }) => {
  const io = app.get("io");
  const fromRequestData = await findTeamRequest({ from, to, type: "from" });
  pubClient.get(String(from), async (err, fromSocketId) => {
    io.to(fromSocketId).emit("receiveRequest", fromRequestData);
  });
  const toLeader = String(await findLeaders(to));
  pubClient.get(toLeader, async (err, toSocketId) => {
    const toRequestData = await findTeamRequest({ from, to, type: "to" });
    io.to(toSocketId).emit("receiveRequest", toRequestData);
  });
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
  pubClient.get(from, async (err, fromSocketId) => {
    const fromRequestData = await findOneRequest({ from, to, type: "from" });
    console.log("here", fromSocketId);
    console.log("from", from);
    io.to(fromSocketId).emit("receiveRequest", fromRequestData);
  });

  pubClient.get(to, async (err, toSocketId) => {
    const toRequestData = await findOneRequest({ from, to, type: "to" });
    console.log("to is here", toSocketId);
    console.log("to", to);
    io.to(toSocketId).emit("receiveRequest", toRequestData);
  });
};

const denyRequestTeam = async ({ from, to }: { from: string; to: number }) => {
  const io = app.get("io");
  await deleteRequest({ from, to: String(to) });
  const toLeader = String(await findLeaders(to));
  pubClient.get(toLeader, (err, toSocketId) => {
    io.to(toSocketId).emit("receiveDenyRequest", { from, to });
  });
  pubClient.get(from, (err, fromSocketId) => {
    io.to(fromSocketId).emit("receiveDenyRequest", { from, to });
  });
};

const denyRequestUser = async ({ from, to }: { from: string; to: string }) => {
  await deleteRequest({ from, to });
  const io = app.get("io");
  const toSocketId = pubClient.get(to, (err, toSocketId) => {
    io.to(toSocketId).emit("receiveDenyRequest", { from, to });
  });
  pubClient.get(from, (err, fromSocketId) => {
    io.to(fromSocketId).emit("receiveDenyRequest", { from, to });
  });
};

const acceptRequestTeam = async ({ from, to }: { from: string; to: number }) => {
  await deleteRequest({ from, to: String(to) });
  const createdChatRoom = await createChatRoom();
  const chatRoomId = createdChatRoom.get({ plain: true }).chatRoomId;
  const members = await createParticipants({ from, to, chatRoomId });
  const membersArr = members.map((member: any) => member.dataValues);
  await createChatMessage({ chatRoomId, message: makeMessageObject({ from, to: from, message: `${from}가 채팅을 수락했습니다.` }) });
  const chatRoomData = await findChatRoomInfo({ chatRoomId, type: "team" });
  const io = app.get("io");
  membersArr.forEach((member: any) => {
    pubClient.get(String(member.id), (err, toSocketId) => {
      io.to(toSocketId).emit("receiveAcceptRequest", { chat: { ...chatRoomData, member: membersArr }, from, to });
    });
  });
};

const acceptRequestUser = async ({ from, to }: { from: string; to: string }) => {
  await deleteRequest({ from, to });
  const createdChatRoom = await createChatRoom();
  const chatRoomId = createdChatRoom.get({ plain: true }).chatRoomId;
  await createParticipant({ from, to, chatRoomId });
  await createChatMessage({ chatRoomId, message: makeMessageObject({ from, to, message: `${to}가 채팅을 수락했습니다.` }) });
  const chatRoomData = await findChatRoomInfo({ chatRoomId, type: "user" });
  const io = app.get("io");
  pubClient.get(from, async (err, fromSocketId) => {
    io.to(fromSocketId).emit("receiveAcceptRequest", { chat: chatRoomData, from, to });
  });
  pubClient.get(to, async (err, toSocketId) => {
    io.to(toSocketId).emit("receiveAcceptRequest", { chat: chatRoomData, from, to });
  });
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

const deleteRequest = async ({ from, to }: { from: string; to: string }) => {
  return await Request.destroy({
    where: {
      [Op.and]: [{ from, to }],
    },
  });
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
  return [...userData, ...datasTo, ...datasFrom];
};

const validateTeam = async ({ gid }: { gid: number }) => {
  return await Team.findOne({ where: { gid } });
};

const createChatRoom = async () => {
  return ChatRoom.create();
};
