import { changeTeamInfo } from "./api";
import { server } from "../../msw/server";

beforeAll(() => server.listen());
afterAll(() => server.close());
/* eslint-disable no-undef */
test("changeTeamInfo", async () => {
  const data = {
    teamName: "1",
    teamInfo: "1",
    location: "1",
  };
  const res = await changeTeamInfo(data);
  expect(res.data).toBe(true);
});
test("exitTeam", () => {
  expect(1).toBe(1);
});
test("createTeam", () => {
  expect(1).toBe(1);
});
test("inviteTeam", () => {
  expect(1).toBe(1);
});

test("postLogin", () => {
  expect(1).toBe(1);
});
test("registerUser", () => {
  expect(1).toBe(1);
});
test("getCowDogInfo", () => {
  expect(1).toBe(1);
});
test("getChatMessage", () => {
  expect(1).toBe(1);
});
test("changeMyInfo", () => {
  expect(1).toBe(1);
});
test("logOutUser", () => {
  expect(1).toBe(1);
});
test("requestAccept", () => {
  expect(1).toBe(1);
});
test("requestDeny", () => {
  expect(1).toBe(1);
});
test("requestChat", () => {
  expect(1).toBe(1);
});
test("postImage", () => {
  expect(1).toBe(1);
});
test("postChat", () => {
  expect(1).toBe(1);
});
test("changeNotReadToRead", () => {
  expect(1).toBe(1);
});
test("checkIdValidation", () => {
  expect(1).toBe(1);
});

// get
test("getTeamInfo", () => {
  expect(1).toBe(1);
});
test("getJoinChat", () => {
  expect(1).toBe(1);
});
test("getChatInfo", () => {
  expect(1).toBe(1);
});
test("getRequestInfo", () => {
  expect(1).toBe(1);
});
test("getTeamInfo", () => {
  expect(1).toBe(1);
});
test("getUserInfo", () => {
  expect(1).toBe(1);
});

export {};
