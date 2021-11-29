// "use strict";
// import { sequelize } from "../../models";
// const queryInterface = sequelize.getQueryInterface();
// const up = async (queryInterface) => {
//   const team = [
//     {
//       gid: 1,
//       image: 2,
//       name: "test1",
//       description: "hello",
//       location: "강남",
//       leader: "test0",
//     },
//     {
//       gid: 2,
//       image: 5,
//       name: "test32",
//       description: "bye",
//       location: "강서",
//       leader: "test1",
//     },
//     {
//       gid: 3,
//       image: 6,
//       name: "hoo",
//       description: "gogo",
//       location: "강북",
//       leader: "test2",
//     },
//   ];
//   await queryInterface.bulkInsert("Team", team, {});
// };

// const down = async (queryInterface) => {
//   return await queryInterface.bulkDelete("Team", null, {});
// };

// up(queryInterface);
