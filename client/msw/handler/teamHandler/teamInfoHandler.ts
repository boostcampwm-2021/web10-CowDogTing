import { MockProps } from "..";

export const teamInfoHandler: MockProps = (req, res, ctx) => {
  return res(
    ctx.json({
      id: "test",
      image: null,
      location: "수원",
      sex: "male",
      age: 25,
      info: "hihi",
      leader: "test1",
      member: [
        {
          id: "test1",
          image: null,
          location: "수원",
          sex: "male",
          age: 25,
          info: "hihi",
          gid: 1,
          idx: 5,
        },
      ],
    })
  );
};
