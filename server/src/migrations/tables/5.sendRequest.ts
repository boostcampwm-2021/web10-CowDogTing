import { SendRequest } from '../../models/sendRequest';

console.log('======Create users Table======');
const create_table_sendRequest = async () => {
  await SendRequest.sync({ force: true })
    .then(() => {
      console.log('✅Success Create users Table');
    })
    .catch((err) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_sendRequest();