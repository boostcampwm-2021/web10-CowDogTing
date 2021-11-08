import { Team } from "../../models/team";

console.log("======Create users Table======");
const create_table_groups = async () => {
  await Team.sync({ force: true }) // 데이터 생성 이후 false로
    .then(() => {
      console.log("✅Success Create users Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create users Table : ", err);
    });
};

create_table_groups();
