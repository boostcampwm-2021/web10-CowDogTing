import { errorHandlerMaker, MockProps } from "..";

export const postChatReadHandler: MockProps = (req, res, ctx) => {
  const errorHandler = errorHandlerMaker(res, ctx);
  const {
    body: { chatRoomId },
  } = req;
  if (chatRoomId === 0) return errorHandler("존재하지 않는 채팅방입니다.");
  return res(ctx.json(5));
};
