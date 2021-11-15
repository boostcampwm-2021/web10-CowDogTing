import express = require("express");
import { Server } from "socket.io";

const SocketMap = new Map<string, string>();
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
    socket.on("setUid", (id: string) => {
      SocketMap.set(id, socket.id);
    });
  });
};