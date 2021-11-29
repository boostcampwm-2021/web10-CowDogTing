import * as bcrypt from "bcrypt";
import { sequelize } from "../../models";
const queryInterface = sequelize.getQueryInterface();
const up = async (queryInterface: any) => {
  let user = [];
  for (let i = 0; i < 2000; i++) {
    const hash = await bcrypt.hash("1234", 12);
    let obj = {
      uid: "test" + i,
      password: hash,
      location: "우만" + 1 + "동",
      image: null,
      age: 25 + (i % 10),
      sex: "male",
      info: "안녕하세요",
      gid: null,
    };
    user.push(obj);
  }

  return await queryInterface.bulkInsert("Users", user, {});
};

const down = async (queryInterface: any) => {
  return await queryInterface.bulkDelete("Users", null, {});
};

up(queryInterface);
