// "use strict";
// import { sequelize } from "../../models";
// const queryInterface = sequelize.getQueryInterface();
// const up = async (queryInterface) => {
//   const request = [
//     {
//       requestId: 1,
//       to: "test3",
//       state: "ready",
//       from: "test2",
//     },
//     {
//       requestId: 2,
//       to: "test3",
//       state: "ready",
//       from: "test2",
//     },
//     {
//       requestId: 3,
//       to: "test6",
//       state: "ready",
//       from: "test2",
//     },
//   ];
//   return await queryInterface.bulkInsert("Request", request, {});
// };

// const down = async (queryInterface) => {
//   return await queryInterface.bulkDelete("Request", null, {});
// };

// up(queryInterface);
