// "use strict";
// import { sequelize } from "../../models";
// const queryInterface = sequelize.getQueryInterface();
// const up = async (queryInterface) => {
//   const chat = [
//     {
//       chatId: 1,
//       chatRoomId: 1,
//       isRead: false,
//       message: "hi",
//       uid: "test2",
//     },
//     {
//       chatId: 2,
//       chatRoomId: 1,
//       isRead: false,
//       message: "hihi",
//       uid: "test2",
//     },
//     {
//       chatId: 3,
//       chatRoomId: 1,
//       isRead: false,
//       message: "asdasda",
//       uid: "test3",
//     },
//     {
//       chatId: 4,
//       chatRoomId: 1,
//       isRead: false,
//       message: "asdasdaasdasda",
//       uid: "test3",
//     },
//     {
//       chatId: 5,
//       chatRoomId: 2,
//       isRead: true,
//       message: "hihihi",
//       uid: "test2",
//     },
//   ];
//   return await queryInterface.bulkInsert("Chat", chat, {});
// };

// const down = async (queryInterface) => {
//   return await queryInterface.bulkDelete("Chat", null, {});
// };

// up(queryInterface);
