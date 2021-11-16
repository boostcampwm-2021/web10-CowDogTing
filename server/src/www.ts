import app from "./app";
import { createServer } from "http";
import { sequelize } from "./db/models";
import { socketInit } from "./webSocket/socket";
const port: number = Number(process.env.PORT) || 4000;

const server = createServer(app);

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
