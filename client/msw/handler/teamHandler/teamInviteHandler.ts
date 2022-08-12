import { MockProps } from "..";

export const teamInviteHandler: MockProps = (req, res, ctx) => {
  const {
    body: { userId },
  } = req;
  if (userId !== "") return res(ctx.json(true));

  return res(
    ctx.status(403),
    ctx.json({
      errorMessage: `유저가 존재하지 않습니다.`,
    })
  );
};
