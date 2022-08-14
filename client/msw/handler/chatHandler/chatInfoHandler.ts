import { MockProps } from "..";

export const chatInfoHandler: MockProps = (req, res, ctx) => {
  return res(
    ctx.json([
      {
        chatRoomId: 1,
        member: [
          { id: "test", image: null, location: "수원", sex: "male", age: 25, info: "hihi", gid: 1, idx: 1 },
          { id: "test1", image: null, location: "수원", sex: "male", age: 25, info: "hihi", gid: 1, idx: 2 },
        ],

        chatMessage: [
          {
            from: "test",
            message: "hihi",
            source: "",
          },
        ],
      },
    ])
  );
};
