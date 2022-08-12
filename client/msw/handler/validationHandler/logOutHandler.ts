import { MockProps } from "..";

export const logOutHandler: MockProps = (req, res, ctx) => res(ctx.json(true));
