import express = require("express");
import { Server, Socket } from "socket.io";
const wrtc = require("wrtc");
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { addReadRow } from "../api/chat/controller";
import { SendChatType, receiverPCType, senderPCsType, usersType, socketToRoomType, userType } from "../util/type";
import { createChatMessage } from "../api/util";
export const pubClient = createClient({ url: process.env.CHAT_REDIS_URL, password: process.env.CHAT_REDIS_PWD });

export const socketInit = (server: any, app: express.Application) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));

  app.set("io", io);

  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("socket 연결 성공 ip : ", ip);
    console.log(socket.id);

    socket.on("setUid", async (Id: string) => {
      pubClient.set(Id, socket.id);
      pubClient.get(Id);
    });

    socket.on("joinChatRoom", (chatroomId: string[]) => {
      socket.join(chatroomId);
    });

    socket.on("sendChat", async ({ chatRoomId, message }: SendChatType) => {
      const createdChatMessage = await createChatMessage({ chatRoomId, message });
      await addReadRow({ chatId: createdChatMessage.chatId, chatRoomId, uid: message.from });
      io.sockets.in(String(chatRoomId)).emit("receiveChat", { chatRoomId: chatRoomId, message });
    });

    socket.on("joinRoom", (data: { id: string; chatRoomId: string }) => {
      try {
        let allUsers = getOtherUsersInRoom(data.id, data.chatRoomId);
        io.to(data.id).emit("allUsers", { users: allUsers });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("senderOffer", async (data: { senderSocketID: string; sdp: any; roomId: string }) => {
      try {
        socketToRoom[data.senderSocketID] = data.roomId;
        let pc = createReceiverPeerConnection(data.senderSocketID, app.get("io"), data.roomId);
        await pc.setRemoteDescription(data.sdp);
        let sdp = await pc.createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVIdeo: true,
        });
        await pc.setLocalDescription(sdp);
        socket.join(data.roomId);
        io.to(data.senderSocketID).emit("getSenderAnswer", { sdp });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("senderCandidate", async (data: { senderSocketID: string; candidate: any }) => {
      try {
        let pc = receiverPCs[data.senderSocketID];
        await pc.addIceCandidate(new wrtc.RTCIceCandidate(data.candidate));
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("receiverOffer", async (data: { receiverSocketID: string; senderSocketID: string; roomID: string; sdp: any }) => {
      try {
        let pc = createSenderPeerConnection(data.receiverSocketID, data.senderSocketID, app.get("io"), data.roomID);
        await pc.setRemoteDescription(data.sdp);
        let sdp = await pc.createAnswer({
          offerToReceiveAudio: false,
          offerToReceiveVIdeo: false,
        });
        await pc.setLocalDescription(sdp);
        app.get("io").to(data.receiverSocketID).emit("getReceiverAnswer", {
          id: data.senderSocketID,
          sdp,
        });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("receiverCandidate", async (data: { senderSocketID: string; receiverSocketID: string; candidate: any }) => {
      try {
        const senderPC = senderPCs[data.senderSocketID].filter((sPC) => sPC.id === data.receiverSocketID)[0];
        await senderPC.pc.addIceCandidate(new wrtc.RTCIceCandidate(data.candidate));
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("leaveRoom", () => {
      try {
        let roomId = socketToRoom[socket.id];

        deleteUser(socket.id, roomId);
        closeReceiverPC(socket.id);
        closeSenderPCs(socket.id);
        app.get("io").to(roomId).emit("userExit", socket.id);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("disconnect", () => {
      try {
        let roomId = socketToRoom[socket.id];

        deleteUser(socket.id, roomId);
        closeReceiverPC(socket.id);
        closeSenderPCs(socket.id);
        app.get("io").to(roomId).emit("userExit", socket.id);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

let receiverPCs: receiverPCType = {};
let senderPCs: senderPCsType = {};
let users: usersType = {};
let socketToRoom: socketToRoomType = {};

const pc_config = {
  iceServers: [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const isIncluded = (array: any[], Id: string) => array.some((item) => item.id === Id);

const createReceiverPeerConnection = (socketId: string, socket: Socket, roomId: string) => {
  const pc = new wrtc.RTCPeerConnection(pc_config);

  if (receiverPCs[socketId]) receiverPCs[socketId] = pc;
  else receiverPCs = { ...receiverPCs, [socketId]: pc };

  pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
    socket.to(socketId).emit("getSenderCandidate", {
      candidate: e.candidate,
    });
  };

  pc.ontrack = (e: RTCTrackEvent) => {
    if (users[roomId]) {
      if (!isIncluded(users[roomId], socketId)) {
        users[roomId].push({
          id: socketId,
          stream: e.streams[0],
        });
      } else return;
    } else {
      users[roomId] = [
        {
          id: socketId,
          stream: e.streams[0],
        },
      ];
    }
    socket.to(roomId).emit("userEnter", { id: socketId });
  };

  return pc;
};

const createSenderPeerConnection = (receiversocketId: string, sendersocketId: string, socket: Socket, roomId: string) => {
  const pc = new wrtc.RTCPeerConnection(pc_config);

  if (senderPCs[sendersocketId]) {
    senderPCs[sendersocketId].filter((user) => user.id !== receiversocketId);
    senderPCs[sendersocketId].push({ id: receiversocketId, pc });
  } else
    senderPCs = {
      ...senderPCs,
      [sendersocketId]: [{ id: receiversocketId, pc }],
    };

  pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
    socket.to(receiversocketId).emit("getReceiverCandidate", {
      id: sendersocketId,
      candidate: e.candidate,
    });
  };

  const sendUser = users[roomId].filter((user) => user.id === sendersocketId)[0];
  sendUser.stream.getTracks().forEach((track) => {
    pc.addTrack(track, sendUser.stream);
  });

  return pc;
};

const getOtherUsersInRoom = (socketId: string, roomId: string) => {
  let allUsers: { id: string }[] = [];
  if (!users[roomId]) return allUsers;
  allUsers = users[roomId]
    .filter((user: userType) => {
      return user.id !== socketId;
    })
    .map((otherUser) => {
      return { id: otherUser.id };
    });

  return allUsers;
};

const deleteUser = (socketId: string, roomId: string) => {
  if (!users[roomId]) return;
  users[roomId] = users[roomId].filter((user) => user.id !== socketId);
  if (users[roomId].length === 0) {
    delete users[roomId];
  }
  if (!socketToRoom[socketId]) return;
  delete socketToRoom[socketId];
};

const closeReceiverPC = (socketId: string) => {
  if (!receiverPCs[socketId]) return;

  receiverPCs[socketId].close();
  delete receiverPCs[socketId];
};

const closeSenderPCs = (socketId: string) => {
  if (!senderPCs[socketId]) return;

  senderPCs[socketId].forEach((senderPC) => {
    senderPC.pc.close();
    const eachSenderPC = senderPCs[senderPC.id].filter((sPC) => sPC.id === socketId)[0];
    if (!eachSenderPC) return;
    eachSenderPC.pc.close();
    senderPCs[senderPC.id] = senderPCs[senderPC.id].filter((sPC) => sPC.id !== socketId);
  });

  delete senderPCs[socketId];
};
