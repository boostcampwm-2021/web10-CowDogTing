import { Team } from "../../models/team";

console.log("======Create team Table======");
const create_table_groups = async () => {
  await Team.sync({ force: true })
    .then(() => {
      console.log("✅Success Create team Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create team Table : ", err);
    });
};

create_table_groups();
