import { Participant } from "../../models/participant";

console.log("======Create users Table======");
const create_table_participant = async () => {
  await Participant.sync({ force: true })
    .then(() => {
      console.log("✅Success Create users Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create users Table : ", err);
    });
};

create_table_participant();
