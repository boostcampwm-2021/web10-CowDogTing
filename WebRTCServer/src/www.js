import app from "./app";
import { createServer } from "https";
import * as fs from "fs";

import { socketInit } from "./webSocket/socket";
const port = Number(process.env.PORT) || 4000;

// const server = createServer(app);
const server = createServer(
  {
    key: fs.readFileSync(__dirname + "/../key.pem", "utf-8"),
    cert: fs.readFileSync(__dirname + "/../cert.pem", "utf-8"),
  },
  app
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
