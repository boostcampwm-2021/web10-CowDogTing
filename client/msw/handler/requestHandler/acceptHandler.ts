import { MockProps } from "..";

export const acceptHandler: MockProps = (req, res, ctx) => {
  const {
    body: { from, to },
  } = req;
  if (from === "") return res(ctx.status(403), ctx.json({ errorMessage: "from입력이 잘못되었습니다." }));
  if (to === "") return res(ctx.status(403), ctx.json({ errorMessage: "to입력이 잘못되었습니다." }));
  if (from === to) return res(ctx.status(403), ctx.json({ errorMessage: "from과 to는 같을 수 없습니다." }));
  return res(ctx.json(true));
};
