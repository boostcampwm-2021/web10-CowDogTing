import app from "./app";
// import { createServer } from "http";
import { createServer } from "https";
import * as fs from "fs";
import { sequelize } from "./db/models";
import { socketInit } from "./webSocket/socket";
const port: number = Number(process.env.PORT) || 4000;

// const server = createServer(app);
const server = createServer(
  {
  key: fs.readFileSync("/etc/letsencrypt/live/www.cowdogting.kro.kr/privkey.pem", "utf-8"),
  cert: fs.readFileSync("/etc/letsencrypt/live/www.cowdogting.kro.kr/cert.pem", "utf-8"),
  },
  app,
);

socketInit(server, app);

server.listen(port, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("connection");
    })
    .catch((err) => {
      console.log("fail: ", err);
    });
});
