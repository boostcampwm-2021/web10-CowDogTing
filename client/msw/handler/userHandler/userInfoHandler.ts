import { errorHandlerMaker, MockProps } from "..";

export const userInfoHandler: MockProps = (req, res, ctx) => {
  const errorHandler = errorHandlerMaker(res, ctx);
  const {
    body: { id, location, age, info },
  } = req;
  if (id === "") return errorHandler("id가 잘못되었습니다.");
  if (location === "") return errorHandler("location이 잘못되었습니다.");
  if (age === 0) return errorHandler("age설정이 잘못되었습니다.");
  if (info === "") return errorHandler("info 입력이 잘못되었습니다.");
  return res(ctx.json(true));
};
