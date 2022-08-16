import { Sequelize } from "sequelize";
import { config } from "../../../config/config";

export const sequelize = new Sequelize("database_production", "root", "qwer1234!", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});
// export const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
//   host: config.development.host,
//   dialect: "mysql",
//   logging: config.development.logging,
// });
