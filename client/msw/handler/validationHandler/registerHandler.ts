import { errorHandlerMaker, MockProps } from "..";

export const registerHandler: MockProps = (req, res, ctx) => {
  const errorHandler = errorHandlerMaker(res, ctx);
  const {
    body: { uid, password, location, age, sex, info },
  } = req;
  if (uid === "") return errorHandler("아이디 입력 오류");
  if (password === "") return errorHandler("비밀번호 입력 오류");
  if (location === "") return errorHandler("지역 입력 오류");
  if (age === 0) return errorHandler("나이 입력 오류");
  if (sex === "") return errorHandler("성별 입력 오류");
  if (info === "") return errorHandler("정보 입력 오류");
  return res(ctx.json(true));
};
