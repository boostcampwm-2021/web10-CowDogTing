import { EnterRoom } from '../../models/enterRoom';

console.log('======Create users Table======');
const create_table_enterRoom = async () => {
  await EnterRoom.sync({ force: true })
    .then(() => {
      console.log('✅Success Create users Table');
    })
    .catch((err) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_enterRoom();