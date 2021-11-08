import { findImage } from "./service";

export const getImage = async (req, res) => {
  const imageID = req.query.imageID;
  const data = await findImage({ imageID });
  res.send(data);
};

export const getJoinChatInfo = async (req, res) => {};
