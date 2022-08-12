import { rest } from "msw";
import { checkIdValidationHandler } from "./checkIdValidationHandler";
import { loginHandler } from "./loginHandler";
import { registerHandler } from "./registerHandler";
import { logOutHandler } from "./logOutHandler";
import { CHECK_ID_VALIDATION_URL, LOGIN_API_URL, LOGOUT_API_URL, REGISTER_API_URL } from "../../../src/Common/URL";

export const validationHandler = [rest.get(LOGOUT_API_URL, logOutHandler), rest.post(REGISTER_API_URL, registerHandler), rest.post(LOGIN_API_URL, loginHandler), rest.get(CHECK_ID_VALIDATION_URL, checkIdValidationHandler)];
