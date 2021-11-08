import { findChatRoomNotReadNum, findImage, findUserInfo } from "./service";

/**
 *
 * @param req
 * @param res
 * [get] : /api/chat/messages
 *
 * 근데 이미지 따로 불러오는 로직이 필요할까??
 * 왜냐면 모든 로직에서 include(join)으로 이미지를 동시에 불러오기는 함
 *
 * Swagger API 명세서에 imageID => imageId 변경 요청
 */
export const getImage = async (req, res) => {
  const {
    query: { imageId },
  } = req;
  try {
    const data = await findImage({ imageId });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

/**
 *
 * @param req
 * @param res
 *
 * [get] : /api/chat/messages
 */
export const getUserInfo = async (req, res) => {
  const {
    user: { uid },
  } = req;

  try {
    const data = await findUserInfo({ uid });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

/**
 *
 * @param req
 * @param res
 * [get] : /api/chat/messages
 */
export const getJoinChatInfo = async (req, res) => {
  const {
    user: { uid },
  } = req;

  try {
    const data = await findChatRoomNotReadNum({ uid });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
