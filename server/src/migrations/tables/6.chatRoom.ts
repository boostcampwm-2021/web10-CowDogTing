import { ChatRoom } from '../../models/chatRoom';

console.log('======Create users Table======');
const create_table_chatRoom = async () => {
  await ChatRoom.sync({ force: true })
    .then(() => {
      console.log('✅Success Create users Table');
    })
    .catch((err) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_chatRoom();