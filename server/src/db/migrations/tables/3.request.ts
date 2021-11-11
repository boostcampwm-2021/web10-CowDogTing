import { Request } from "../../models/request";

console.log("======Create request Table======");
const create_table_request = async () => {
  await Request.sync({ force: true })
    .then(() => {
      console.log("✅Success Create request Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create request Table : ", err);
    });
};

create_table_request();
