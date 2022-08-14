import { MockProps } from "..";

export const joinChatHandler: MockProps = (req, res, ctx) => {
  return res(
    ctx.json([
      { chatRoomId: 1, notReadNum: 0 },
      { chatRoomId: 12, notReadNum: 5 },
    ])
  );
};
