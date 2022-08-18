import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "970325dudwls!",
    database: process.env.DB_DBNAME || "cowdogting",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  },
};

console.log(config);
