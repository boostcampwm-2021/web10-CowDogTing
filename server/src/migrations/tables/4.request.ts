import { Request } from '../../models/request';

console.log('======Create users Table======');
const create_table_request = async () => {
  await Request.sync({ force: true })
    .then(() => {
      console.log('✅Success Create users Table');
    })
    .catch((err) => {
      console.log('❗️Error in Create users Table : ', err);
    });
};

create_table_request();