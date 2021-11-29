// "use strict";
// import { sequelize } from "../../models";
// const queryInterface = sequelize.getQueryInterface();
// const up = async (queryInterface) => {
//   const participant = [
//     {
//       uid: "test2",
//       chatRoomId: 1,
//     },
//     {
//       uid: "test3",
//       chatRoomId: 1,
//     },
//     {
//       uid: "test2",
//       chatRoomId: 2,
//     },
//     {
//       uid: "test4",
//       chatRoomId: 2,
//     },
//     {
//       uid: "test1",
//       chatRoomId: 1,
//     },
//     {
//       uid: "test5",
//       chatRoomId: 2,
//     },
//   ];
//   return await queryInterface.bulkInsert("Participant", participant, {});
// };

// const down = async (queryInterface) => {
//   return await queryInterface.bulkDelete("Participant", null, {});
// };

// up(queryInterface);
