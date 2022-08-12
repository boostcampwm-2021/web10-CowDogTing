import { MockProps } from "..";

export const teamExitHandler: MockProps = (req, res, ctx) => {
  return res(ctx.json(true));
};
