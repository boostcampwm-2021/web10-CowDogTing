// src/mocks/server.js
import { setupServer } from "msw/node";
import { validationHandler, request as requestHandler, teamHandler, chatHandler, user as userHandler } from "./handler";

export const server = setupServer(...teamHandler, ...requestHandler, ...chatHandler, ...userHandler, ...validationHandler);
