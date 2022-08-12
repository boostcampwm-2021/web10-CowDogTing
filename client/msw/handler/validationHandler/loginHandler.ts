import { MockProps } from "..";

export const loginHandler: MockProps = (req, res, ctx) => {
  const {
    body: { uid, password },
  } = req;
  if (uid !== "test" || password !== "qwer1234") return res(ctx.status(403), ctx.json({ errorMessage: "로그인 실패" }));
  return res(ctx.json(true));
};
