import { findChatRoomInfo, findMessages } from "./service";

/**
 *
 * @param req
 * @param res
 * /api/chat/messages
 */
export const getChatsInfo = async (req, res) => {
  const {
    user: { uid },
  } = req;

  try {
    const data = await findChatRoomInfo({ uid });
    res.send(data);
  } catch (err) {
    // 어떻게 할까?
    res.send(err);
  }
};

/**
 *
 * @param req
 * @param res
 * /api/chat/messages
 * query string Swagger : ChatRoomID => chatRoomId 로 변경 요망
 */
export const getChatMessage = async (req, res) => {
  const {
    query: { chatRoomId },
  } = req;

  try {
    const data = await findMessages({ chatRoomId });
    res.send(data);
  } catch (err) {
    // 어떻게 할까?
    res.send(err);
  }
};
