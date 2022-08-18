import { errorHandlerMaker, MockProps } from "..";

export const acceptHandler: MockProps = (req, res, ctx) => {
  const errorHandler = errorHandlerMaker(res, ctx);
  const {
    body: { from, to },
  } = req;
  if (from === "") return errorHandler("from입력이 잘못되었습니다.");
  if (to === "") return errorHandler("to입력이 잘못되었습니다.");
  if (from === to) return errorHandler("from과 to는 같을 수 없습니다.");
  return res(ctx.json(true));
};
