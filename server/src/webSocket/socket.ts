import express = require("express");
const wrtc = require("webrtc");
import { Server, Socket } from "socket.io";
import { createChatMessage } from "../api/chat/service";
import { SendChatType, receiverPCType, senderPCsType, usersType, socketToRoomType, userType } from "../util/type";

export const SocketMap = new Map<string, string>();

export const socketInit = (server: any, app: express.Application) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.set("io", io);
  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("socket 연결 성공 ip : ", ip);
    console.log(socket.id);

    //여기 부터 chating

    socket.on("setUId", (Id: string) => {
      SocketMap.set(Id, socket.id);
    });

    socket.on("joinChatRoom", (chatroomId: string[]) => {
      socket.join(chatroomId);
    });

    socket.on("sendChat", ({ chatRoomId, message }: SendChatType) => {
      createChatMessage({ chatRoomId, message });
      io.sockets.in(String(chatRoomId)).emit("receiveChat", { chatRoomId: chatRoomId, message });
    });

    //  여기부터 rtc

    socket.on("joinRoom", (data: { Id: string; roomId: string }) => {
      try {
        let allUsers = getOtherUsersInRoom(data.Id, data.roomId);
        io.to(data.Id).emit("allUsers", { users: allUsers });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("senderOffer", async (data: { sendersocketId: string; sdp: any; roomId: string }) => {
      try {
        socketToRoom[data.sendersocketId] = data.roomId;
        let pc = createReceiverPeerConnection(data.sendersocketId, socket, data.roomId);
        await pc.setRemoteDescription(data.sdp);
        let sdp = await pc.createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVIdeo: true,
        });
        await pc.setLocalDescription(sdp);
        socket.join(data.roomId);
        io.to(data.sendersocketId).emit("getSenderAnswer", { sdp });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("senderCandIdate", async (data: { sendersocketId: string; candIdate: any }) => {
      try {
        let pc = receiverPCs[data.sendersocketId];
        await pc.addIceCandidate(new wrtc.RTCIceCandIdate(data.candIdate));
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("receiverOffer", async (data: { receiversocketId: string; sendersocketId: string; roomId: string; sdp: any }) => {
      try {
        let pc = createSenderPeerConnection(data.receiversocketId, data.sendersocketId, socket, data.roomId);
        await pc.setRemoteDescription(data.sdp);
        let sdp = await pc.createAnswer({
          offerToReceiveAudio: false,
          offerToReceiveVIdeo: false,
        });
        await pc.setLocalDescription(sdp);
        io.to(data.receiversocketId).emit("getReceiverAnswer", {
          Id: data.sendersocketId,
          sdp,
        });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("receiverCandIdate", async (data: { sendersocketId: string; receiversocketId: string; candIdate: any }) => {
      try {
        const senderPC = senderPCs[data.sendersocketId].filter((sPC) => sPC.id === data.receiversocketId)[0];
        await senderPC.pc.addIceCandidate(new wrtc.RTCIceCandIdate(data.candIdate));
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

        socket.broadcast.to(roomId).emit("userExit", { id: socket.id });
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

const isIncluded = (array: any[], Id: string) => array.some((item) => item.Id === Id);

const createReceiverPeerConnection = (socketId: string, socket: Socket, roomId: string) => {
  const pc = new wrtc.RTCPeerConnection(pc_config);

  if (receiverPCs[socketId]) receiverPCs[socketId] = pc;
  else receiverPCs = { ...receiverPCs, [socketId]: pc };

  pc.onicecandIdate = (e: RTCPeerConnectionIceEvent) => {
    //console.log(`socketId: ${socketId}'s receiverPeerConnection icecandIdate`);
    socket.to(socketId).emit("getSenderCandIdate", {
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
    socket.broadcast.to(roomId).emit("userEnter", { Id: socketId });
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

  pc.onicecandIdate = (e: RTCPeerConnectionIceEvent) => {
    //console.log(`socketId: ${receiversocketId}'s senderPeerConnection icecandIdate`);
    socket.to(receiversocketId).emit("getReceiverCandIdate", {
      Id: sendersocketId,
      candIdate: e.candidate,
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

  allUsers = users[roomId].filter((user: userType) => user.id !== socketId).map((otherUser) => ({ id: otherUser.id }));

  return allUsers;
};

const deleteUser = (socketId: string, roomId: string) => {
  if (!users[roomId]) return;
  users[roomId] = users[roomId].filter((user) => user.id !== socketId);
  if (users[roomId].length === 0) {
    delete users[roomId];
  }
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
