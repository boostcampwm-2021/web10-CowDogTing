import { changeMyInfo, changeNotReadToRead, changeTeamInfo, checkIdValidation, createTeam, exitTeam, getChatMessage, getCowDogInfo, getFetch, inviteTeam, logOutUser, postLogin, registerUser, requestAccept, requestChat, requestDeny } from "./api";
import { server } from "../../msw/server";
import { TEAM_INFO_URL, JOIN_CHAT_URL, CHAT_INFO_URL, REQUEST_URL, USER_URL } from "./URL";

beforeAll(() => server.listen());
afterAll(() => server.close());

const changeTeamInfoData = {
  teamName: "1",
  teamInfo: "1",
  location: "1",
};
test("changeTeamInfo API Success", async () => {
  const res = await changeTeamInfo(changeTeamInfoData);
  expect(res.data).toBe(true);
});

test("changeTeamInfo API Fail", async () => {
  expect(async () => {
    await changeTeamInfo({ ...changeTeamInfoData, teamName: "" });
  }).rejects.toThrowError(new Error("팀 정보 수정에 실패했습니다."));
});

test("exitTeam API Success", async () => {
  const res = await exitTeam();
  expect(res.data).toBe(true);
});

test("createTeam API Success", async () => {
  const res = await createTeam(changeTeamInfoData);
  expect(res).toBe(1);
});

test("createTeam API Fail", () => {
  expect(async () => {
    await createTeam({ ...changeTeamInfoData, teamName: "" });
  }).rejects.toThrowError(new Error("팀 생성에 실패하셨습니다."));
});

const inviteTeamData = { userId: "1" };
test("inviteTeam API Success", async () => {
  const res = await inviteTeam(inviteTeamData);
  expect(res.data).toBe(true);
});

test("inviteTeam API Fail", () => {
  expect(async () => {
    await inviteTeam({ ...inviteTeamData, userId: "" });
  }).rejects.toThrowError(new Error("유저가 존재하지 않습니다."));
});

const postLoginData = { id: "test", pw: "qwer1234" };
test("postLogin API Success", async () => {
  const res = await postLogin(postLoginData);
  expect(res).toBe(true);
});

test("postLogin API Fail", () => {
  expect(async () => {
    await postLogin({ ...postLoginData, pw: "" });
  }).rejects.toThrowError(new Error("아이디,비밀번호를 확인해 주세요"));
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
  expect(data).toEqual([
    {
      from: "to",
      message: "hi",
      source: "",
    },
  ]);
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

test("requestDeny API is Success", async () => {
  const res = await requestDeny(requestAccepData);
  expect(res).toBe(true);
});
test("requestDeny API is From Fail", () => {
  expect(async () => {
    await requestDeny({ ...requestAccepData, from: "" });
  }).rejects.toThrowError(new Error("from입력이 잘못되었습니다."));
});
test("requestDeny API is To Fail", () => {
  expect(async () => {
    await requestDeny({ ...requestAccepData, to: "" });
  }).rejects.toThrowError(new Error("to입력이 잘못되었습니다."));
});

test("requestDeny API is From same To Fail", () => {
  expect(async () => {
    await requestDeny({ ...requestAccepData, to: "me" });
  }).rejects.toThrowError(new Error("from과 to는 같을 수 없습니다."));
});

test("requestChat API is Success", async () => {
  const res = await requestChat(requestAccepData);
  expect(res).toBe(true);
});
test("requestChat API is From Fail", () => {
  expect(async () => {
    await requestChat({ ...requestAccepData, from: "" });
  }).rejects.toThrowError(new Error("from입력이 잘못되었습니다."));
});
test("requestChat API is To Fail", () => {
  expect(async () => {
    await requestChat({ ...requestAccepData, to: "" });
  }).rejects.toThrowError(new Error("to입력이 잘못되었습니다."));
});

test("requestChat API is From same To Fail", () => {
  expect(async () => {
    await requestChat({ ...requestAccepData, to: "me" });
  }).rejects.toThrowError(new Error("from과 to는 같을 수 없습니다."));
});

test("changeNotReadToRead API is Success", async () => {
  const res = await changeNotReadToRead(5);
  expect(res).toBe(5);
});

test("changeNotReadToRead API is Fail", () => {
  expect(async () => {
    await changeNotReadToRead(0);
  }).rejects.toThrowError(new Error("존재하지 않는 채팅방입니다."));
});

const existName = "test";
const unExistName = "test1";
test("checkIdValidation is Success false", async () => {
  const res = await checkIdValidation(existName);
  expect(res).toBe(false);
});

test("checkIdValidation is Success true", async () => {
  const res = await checkIdValidation(unExistName);
  expect(res).toBe(true);
});

test("checkIdValidation is Fail", () => {
  expect(async () => {
    await checkIdValidation("");
  }).rejects.toThrowError("잘못된 id 형식입니다.");
});

// // get
test("getTeamInfo API is Success", async () => {
  const res = await getFetch({ url: TEAM_INFO_URL, query: "" });
  expect(res).toEqual({
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
  });
});
test("getJoinChat API is Success", async () => {
  const data = await getFetch({ url: JOIN_CHAT_URL, query: "" });
  expect(data).toEqual([
    { chatRoomId: 1, notReadNum: 0 },
    { chatRoomId: 12, notReadNum: 5 },
  ]);
});
test("getChatInfo API is Success", async () => {
  const data = await getFetch({ url: CHAT_INFO_URL, query: "" });
  expect(data).toEqual([
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
  ]);
});
test("getRequestInfo API is Success", async () => {
  const data = await getFetch({ url: REQUEST_URL, query: "" });
  expect(data).toEqual({
    from: "test",
    to: "test1",
    info: { id: "test", image: null, location: "수원", sex: "male", age: 26, info: "Hi" },
    state: "",
  });
});
test("getUserInfo API is Success", async () => {
  const data = await getFetch({ url: USER_URL, query: "" });
  expect(data).toEqual({
    id: "test",
    image: null,
    location: "수원",
    sex: "male",
    age: 26,
    info: "hihi",
    gid: null,
    idx: 0,
  });
});

test("getCowDogInfo API is Success", async () => {
  const data = await getCowDogInfo(1, 1, "");
  expect(data).toEqual({
    id: "test",
    image: null,
    location: "수원",
    sex: "male",
    age: 26,
    info: "hihi",
  });
});

export {};
