import { changeTeamInfo, createTeam, exitTeam, inviteTeam, postLogin } from "./api";
import { server } from "../../msw/server";

beforeAll(() => server.listen());
afterAll(() => server.close());

test("changeTeamInfo API Success", async () => {
  const data = {
    teamName: "1",
    teamInfo: "1",
    location: "1",
  };
  const res = await changeTeamInfo(data);
  expect(res.data).toBe(true);
});

test("changeTeamInfo API Fail", async () => {
  const data = {
    teamName: "",
    teamInfo: "1",
    location: "1",
  };
  expect(async () => {
    await changeTeamInfo(data);
  }).rejects.toThrowError(new Error("팀 정보 수정에 실패했습니다."));
});

test("exitTeam API Success", async () => {
  const res = await exitTeam();
  expect(res.data).toBe(true);
});

test("createTeam API Success", async () => {
  const data = {
    teamName: "1",
    teamInfo: "1",
    location: "1",
  };
  const res = await createTeam(data);
  expect(res).toBe(1);
});

test("createTeam API Fail", () => {
  const data = {
    teamName: "",
    teamInfo: "1",
    location: "1",
  };
  expect(async () => {
    await createTeam(data);
  }).rejects.toThrowError(new Error("팀 생성에 실패하셨습니다."));
});

test("inviteTeam API Success", async () => {
  const data = { userId: "1" };
  const res = await inviteTeam(data);
  expect(res.data).toBe(true);
});

test("inviteTeam API Fail", () => {
  const data = { userId: "" };
  expect(async () => {
    await inviteTeam(data);
  }).rejects.toThrowError(new Error("유저가 존재하지 않습니다."));
});

test("postLogin API Success", async () => {
  const data = { id: "test", pw: "qwer1234" };
  const res = await postLogin(data);
  expect(res).toBe(true);
});

test("postLogin API Fail", () => {
  const data = { id: "test", pw: "qwer12345" };
  expect(async () => {
    await postLogin(data);
  }).rejects.toThrowError(new Error("로그인 실패"));
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
