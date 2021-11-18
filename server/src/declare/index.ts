import { SessionData } from "express-session";
import "webrtc";

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

declare global {
  interface RTCPeerConnectionIceEvent {
    readonly url: string | null;
    readonly candidate: any;
  }
}
