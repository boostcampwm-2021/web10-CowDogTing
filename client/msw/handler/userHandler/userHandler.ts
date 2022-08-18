import { MockProps } from "..";

export const userHandler: MockProps = (req, res, ctx) => {
  return res(
    ctx.json({
      id: "test",
      image: null,
      location: "수원",
      sex: "male",
      age: 26,
      info: "hihi",
      gid: null,
      idx: 0,
    })
  );
};
