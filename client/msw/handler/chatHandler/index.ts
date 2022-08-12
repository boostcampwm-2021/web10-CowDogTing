import { rest } from "msw";
import { POST_CHAT_READ_API_URL, CHAT_INFO_URL, CHAT_MESSAGES_API_URL, JOIN_CHAT_URL } from "../../../src/Common/URL";

import { chatInfoHandler } from "./chatInfoHandler";
import { chatMessagesHandler } from "./chatMessagesHandler";
import { joinChatHandler } from "./joinChatHandler";
import { postChatReadHandler } from "./postChatReadHandler";

export const chatHandler = [rest.post(POST_CHAT_READ_API_URL, postChatReadHandler), rest.post(JOIN_CHAT_URL, joinChatHandler), rest.post(CHAT_INFO_URL, chatInfoHandler), rest.get(CHAT_MESSAGES_API_URL, chatMessagesHandler)];
