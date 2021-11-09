import { findImage, findChatRoomNotReadNum, findAllRequest, findUserInfo } from "./service";

export const getImage = async (req, res) => {
  const imageID = req.query.imageID;
  const data = await findImage({ imageID });
  res.send(data);
};

export const getJoinChatInfo = async (req, res) => {
  const uid = req.query.uid;
  const data = await findChatRoomNotReadNum({ uid });
  res.send(data);
};

export const getRequest = async (req, res) => {
  const uid = req.query.uid;
  const data = await findAllRequest({ uid });
  res.send(data);
};

export const getUserInfo = async (req, res) => {
  const uid = req.query.uid;
  const data = await findUserInfo({ uid });
  res.send(data);
};
