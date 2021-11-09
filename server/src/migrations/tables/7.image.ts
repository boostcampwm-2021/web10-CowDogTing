import { Image } from "../../models/image";

console.log("======Create users Table======");
const create_table_image = async () => {
  await Image.sync({ force: true })
    .then(() => {
      console.log("✅Success Create image Table");
    })
    .catch((err) => {
      console.log("❗️Error in Create image Table : ", err);
    });
};

create_table_image();
