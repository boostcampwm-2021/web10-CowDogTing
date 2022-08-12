import { rest } from "msw";
import { acceptHandler } from "./acceptHandler";
import { denyHandler } from "./denyHandler";
import { requestHandler } from "./requestHandler";
import { requestApiHandler } from "./requestApiHandler";
import { ACCEPT_API_URL, DENY_API_URL, REQUEST_API_URL, REQUEST_URL } from "../../../src/Common/URL";

export const request = [rest.post(ACCEPT_API_URL, acceptHandler), rest.post(DENY_API_URL, denyHandler), rest.post(REQUEST_API_URL, requestApiHandler), rest.get(REQUEST_URL, requestHandler)];
