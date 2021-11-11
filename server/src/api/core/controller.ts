import { findImage, findChatRoomNotReadNum, findAllRequest, findUserInfo, findAllProfile } from "./service";

const defaultUser = {
  id: "",
  image: "",
  location: "",
  sex: "",
  age: 0,
  info: "",
  gid: null,
};

const defaultRequest = {};
const defaultJoinChatRoom = {};

export const getImage = async (req, res) => {
  const imageID = req.query.imageID;
  const data = await findImage({ imageID });
  res.send(data);
};

export const getJoinChatInfo = async (req, res) => {
  if (!req.user) {
    res.send(defaultJoinChatRoom);
    return;
  }
  const uid: string = req.user.uid;
  console.log(uid);
  const data = await findChatRoomNotReadNum({ uid });
  res.send(data);
};

export const getRequest = async (req, res) => {
  if (!req.user) {
    res.send(defaultRequest);
    return;
  }
  const uid: string = req.user.uid;
  const data = await findAllRequest({ uid });
  res.send(data);
};

export const getUserInfo = async (req, res) => {
  if (!req.user) {
    res.send(defaultUser);
    return;
  }
  const uid: string = req.user.uid;
  const data = await findUserInfo({ uid });
  res.send(data);
};

export const getProfile = async (req, res) => {
  const person: number = req.query.person;
  const data = await findAllProfile(person);
  res.send(data);
};
