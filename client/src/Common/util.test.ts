import { Blob } from "buffer";
import { server } from "../../msw/server";
import { checkLogin, fromImageToForm, handleModalClick, makeCategory, transAgeToNumber, useThrottle } from "./util";

beforeAll(() => server.listen());
afterAll(() => server.close());

const sessionStorageMock = (() => {
  const store: any = {};

  return {
    getItem(key: string) {
      return store[key] ?? null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
  };
})();

function FormDataMock() {
  const form: {
    [key: string]: string;
  } = {};
  return {
    append(key: string, value: any) {
      form[key] = value;
    },
    get(key: string) {
      return form[key];
    },
  };
}

global.FormData = FormDataMock as any;

Object.defineProperty(global, "sessionStorage", {
  value: sessionStorageMock,
});

describe("useThrottle", () => {
  it("should not call duplicated", async () => {
    const cb = jest.fn();
    const handler = useThrottle(cb, 100);
    handler();
    handler();
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    expect(cb).toBeCalledTimes(1);
  });
});

describe("handleModalClick", () => {
  const hanlder = jest.fn();
  const e = { target: null };

  it("should be undefined", () => {
    const refs = { current: [] };
    const func = handleModalClick(refs, hanlder);
    expect(func(e as any)).toEqual(undefined);
  });

  it("should be undefined", () => {
    const nullRefs = { current: null };
    const func = handleModalClick(nullRefs, hanlder);
    expect(func(e as any)).toEqual(undefined);
  });

  it("should be success", () => {
    const target = {
      dataset: { id: 1 },
    };
    const refs = {
      current: [
        {
          contains: (t: any) => true,
          ...target,
        },
      ],
    };
    const func = handleModalClick(refs as any, hanlder);
    expect(func({} as any)).toEqual(undefined);
  });

  it("should be null", () => {
    const refs = {
      current: [
        {
          contains: (t: any) => false,
        },
      ],
    };
    const func = handleModalClick(refs as any, hanlder);
    expect(func({} as any)).toEqual(undefined);
  });
});

describe("checkLogin", () => {
  it("should be faile", () => {
    expect(checkLogin()).toEqual(false);
  });
  it("should be success", () => {
    sessionStorage.setItem("isLogin", "true");
    expect(checkLogin()).toEqual(true);
  });
});

describe("fromImageToForm", () => {
  it("should be success", () => {
    const blob = new Blob([""], { type: "text/html" });
    const formData = fromImageToForm(1, "1", blob as any);
    expect(formData.get("from")).toEqual("1");
  });
});

describe("makeCategory", () => {
  it("should be 남자", () => {
    expect(makeCategory("남자")).toEqual("&sex=male");
  });
  it("should be 여자", () => {
    expect(makeCategory("여자")).toEqual("&sex=female");
  });
  it("should be age", () => {
    expect(makeCategory("10대")).toEqual("&age=10");
  });
  it("should be location", () => {
    expect(makeCategory("서울")).toEqual("&location=서울");
  });
});

describe("transAgeToNumber", () => {
  it("should be 10대", () => {
    expect(transAgeToNumber("10대")).toEqual("10");
  });
  it("should be 20대", () => {
    expect(transAgeToNumber("20대")).toEqual("20");
  });
  it("should be 30대", () => {
    expect(transAgeToNumber("30대")).toEqual("30");
  });
  it("should be 40대", () => {
    expect(transAgeToNumber("40대")).toEqual("40");
  });
});
