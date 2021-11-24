import { ReadTable } from "../../models/read";

console.log("======Create read Table======");
const create_table_read = async () => {
  await ReadTable.sync({ force: true })
    .then(() => {
      console.log("✅Success Create read Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create read Table : ", err);
    });
};

create_table_read();
