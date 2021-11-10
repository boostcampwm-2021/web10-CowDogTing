"use strict";
import { sequelize } from "../../models";
const queryInterface = sequelize.getQueryInterface();
const up = async (queryInterface) => {
  let user = [];
  for (let i = 0; i < 10; i++) {
    let obj = {
      uid: "test" + i,
      password: "1234",
      location: "우만" + 1 + "동",
      image: i,
      age: 25 + i,
      sex: "male",
      info: "안녕하세요",
      gid: (i % 3) + 1,
    };
    user.push(obj);
  }

  return await queryInterface.bulkInsert("Users", user, {});
};

const down = async (queryInterface) => {
  return await queryInterface.bulkDelete("Users", null, {});
};

up(queryInterface);
