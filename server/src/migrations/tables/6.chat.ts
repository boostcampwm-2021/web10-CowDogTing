import { Chat } from '../../models/chat';

console.log('======Create users Table======');
const create_table_chat = async () => {
  await Chat.sync({ force: true })
    .then(() => {
      console.log('✅Success Create users Table');
    })
    .catch((err) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_chat();