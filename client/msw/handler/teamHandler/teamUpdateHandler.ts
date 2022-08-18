import { MockProps } from "..";

export const teamUpdateHandler: MockProps = (req, res, ctx) => {
  const { name, description, location } = req.body;
  if (name === "" || description === "" || location === "")
    return res(
      // Send a valid HTTP status code
      ctx.status(403),
      // And a response body, if necessary
      ctx.json({
        errorMessage: `error`,
      })
    );
  return res(ctx.json(true));
};
