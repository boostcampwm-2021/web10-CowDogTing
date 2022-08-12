import { errorHandlerMaker, MockProps } from "..";

export const checkIdValidationHandler: MockProps = (req, res, ctx) => {
  const errorHandler = errorHandlerMaker(res, ctx);
  const params = req.url.searchParams;
  const uid = params.get("uid");
  if (uid === "") return errorHandler("잘못된 id 형식입니다.");
  if (uid === "test") return res(ctx.json(false));
  return res(ctx.json(true));
};
