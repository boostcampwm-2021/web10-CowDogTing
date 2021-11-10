import { ChatRoom } from "../../models/chatRoom";

console.log("======Create chatRoom Table======");
const create_table_chatRoom = async () => {
  await ChatRoom.sync({ force: true })
    .then(() => {
      console.log("✅Success Create chatRoom Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create chatRoom Table : ", err);
    });
};

create_table_chatRoom();
