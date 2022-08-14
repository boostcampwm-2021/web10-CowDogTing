import { MockProps } from "..";

export const requestHandler: MockProps = (req, res, ctx) => {
  return res(
    ctx.json({
      from: "test",
      to: "test1",
      info: { id: "test", image: null, location: "수원", sex: "male", age: 26, info: "Hi" },
      state: "",
    })
  );
};
