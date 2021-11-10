import { findImage, findChatRoomNotReadNum, findAllRequest, findUserInfo, findAllProfile } from "./service";

export const getImage = async (req, res) => {
  const imageID = req.query.imageID;
  const data = await findImage({ imageID });
  res.send(data);
};

export const getJoinChatInfo = async (req, res) => {
  const uid: string = req.query.uid;
  const data = await findChatRoomNotReadNum({ uid });
  res.send(data);
};

export const getRequest = async (req, res) => {
  const uid: string = req.query.uid;
  const data = await findAllRequest({ uid });
  res.send(data);
};

export const getUserInfo = async (req, res) => {
  const uid: string = req.query.uid; // 미들웨어 추가
  const data = await findUserInfo({ uid });
  res.send(data);
};

export const getProfile = async (req, res) => {
  const person: number = req.query.person;
  const data = await findAllProfile(person);
  res.send(data);
};
