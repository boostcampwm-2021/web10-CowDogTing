import { Participant } from "../../models/participant";

console.log("======Create participant Table======");
const create_table_participant = async () => {
  await Participant.sync({ force: true })
    .then(() => {
      console.log("✅Success Create participant Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create participant Table : ", err);
    });
};

create_table_participant();
