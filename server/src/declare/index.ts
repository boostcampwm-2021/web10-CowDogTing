import { SessionData } from "express-session";
declare module "express-session" {
  interface SessionData {
    kakao?: any;
    github?: any;
    naver?: any;
    cookie: Cookie;
  }
}

declare global {
  namespace Express {
    interface User {
      uid?: string;
      gid?: number;
    }
  }
}
