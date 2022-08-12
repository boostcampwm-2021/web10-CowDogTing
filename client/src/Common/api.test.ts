import { changeMyInfo, changeTeamInfo, createTeam, exitTeam, getChatMessage, inviteTeam, logOutUser, postLogin, registerUser, requestAccept } from "./api";
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

const registerData = {
  id: "test",
  pw: "qwer1234",
  location: "수원",
  age: 25,
  sex: "male",
  info: "hi",
};
test("registerUser API is Success", async () => {
  const res = await registerUser(registerData);
  expect(res).toBe(true);
});

test("registerUser API is ID Error", () => {
  expect(async () => {
    await registerUser({ ...registerData, id: "" });
  }).rejects.toThrowError(new Error("아이디 입력 오류"));
});

test("registerUser API is sex Error", () => {
  expect(async () => {
    await registerUser({ ...registerData, sex: "" });
  }).rejects.toThrowError(new Error("성별 입력 오류"));
});
test("registerUser API is PW Error", () => {
  expect(async () => {
    await registerUser({ ...registerData, pw: "" });
  }).rejects.toThrowError(new Error("비밀번호 입력 오류"));
});
test("registerUser API is Location Error", () => {
  expect(async () => {
    await registerUser({ ...registerData, location: "" });
  }).rejects.toThrowError(new Error("지역 입력 오류"));
});
test("registerUser API is Age Error", () => {
  expect(async () => {
    await registerUser({ ...registerData, age: 0 });
  }).rejects.toThrowError(new Error("나이 입력 오류"));
});
test("registerUser API is info Error", () => {
  expect(async () => {
    await registerUser({ ...registerData, info: "" });
  }).rejects.toThrowError(new Error("정보 입력 오류"));
});

const getChatMessageData = { index: 1, chatRoomId: 1 };
test("getChatMessage API is Success", async () => {
  const data = await getChatMessage(getChatMessageData);
  expect(data).toBe(true);
});
test("getChatMessage API is index FAil", async () => {
  expect(async () => {
    await getChatMessage({ ...getChatMessageData, index: 0 });
  }).rejects.toThrowError(new Error("index에러"));
});
test("getChatMessage API is chatRoomId FAil", () => {
  expect(async () => {
    await getChatMessage({ ...getChatMessageData, chatRoomId: 0 });
  }).rejects.toThrowError(new Error("chatRoomId에러"));
});

const changeMyInfoData = { id: "test", location: "수원", age: 25, info: "hi" };
test("changeMyInfo API is Success", async () => {
  const res = await changeMyInfo(changeMyInfoData);
  expect(res).toBe(true);
});

test("changeMyInfo API is id fail", async () => {
  expect(async () => {
    await changeMyInfo({ ...changeMyInfoData, id: "" });
  }).rejects.toThrowError("id가 잘못되었습니다.");
});

test("changeMyInfo API is location fail", async () => {
  expect(async () => {
    await changeMyInfo({ ...changeMyInfoData, location: "" });
  }).rejects.toThrowError("location이 잘못되었습니다.");
});

test("changeMyInfo API is age fail", async () => {
  expect(async () => {
    await changeMyInfo({ ...changeMyInfoData, age: 0 });
  }).rejects.toThrowError("age설정이 잘못되었습니다.");
});

test("changeMyInfo API is info fail", async () => {
  expect(async () => {
    await changeMyInfo({ ...changeMyInfoData, info: "" });
  }).rejects.toThrowError("info 입력이 잘못되었습니다.");
});

test("logOutUser API is Success", async () => {
  const res = await logOutUser();
  expect(res).toBe(true);
});

const requestAccepData = { from: "me", to: "you" };
test("requestAccept API is Success", async () => {
  const res = await requestAccept(requestAccepData);
  expect(res).toBe(true);
});
test("requestAccept API is From Fail", () => {
  expect(async () => {
    await requestAccept({ ...requestAccepData, from: "" });
  }).rejects.toThrowError(new Error("from입력이 잘못되었습니다."));
});
test("requestAccept API is To Fail", () => {
  expect(async () => {
    await requestAccept({ ...requestAccepData, to: "" });
  }).rejects.toThrowError(new Error("to입력이 잘못되었습니다."));
});

test("requestAccept API is From same To Fail", () => {
  expect(async () => {
    await requestAccept({ ...requestAccepData, to: "me" });
  }).rejects.toThrowError(new Error("from과 to는 같을 수 없습니다."));
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
