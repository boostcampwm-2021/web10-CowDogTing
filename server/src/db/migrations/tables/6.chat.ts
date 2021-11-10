import { Chat } from "../../models/chat";

console.log("======Create chat Table======");
const create_table_chat = async () => {
  await Chat.sync({ force: true })
    .then(() => {
      console.log("✅Success Create chat Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create chat Table : ", err);
    });
};

create_table_chat();
