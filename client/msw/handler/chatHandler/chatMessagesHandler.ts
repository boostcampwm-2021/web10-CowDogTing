import { MockProps } from "..";

export const chatMessagesHandler: MockProps = (req, res, ctx) => {
  const params = req.url.searchParams;
  const chatRoomId = params.get("chatRoomId");
  const index = params.get("index");
  if (index === "0") return res(ctx.status(403), ctx.json({ errorMessage: "index에러" }));
  if (chatRoomId === "0") return res(ctx.status(403), ctx.json({ errorMessage: "chatRoomId에러" }));
  return res(ctx.json(true));
};
