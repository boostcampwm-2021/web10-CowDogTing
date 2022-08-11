import { rest } from "msw";
import { POST_CHAT_READ_API_URL, POST_IMAGE_API_URL, CHAT_INFO_URL, CHAT_MESSAGES_API_URL, JOIN_CHAT_URL, POST_CHAT_API_URL } from "../../../src/Common/URL";

import { chatInfoHandler } from "./chatInfoHandler";
import { chatMessagesHandler } from "./chatMessagesHandler";
import { joinChatHandler } from "./joinChatHandler";
import { postChatHandler } from "./postChatHandler";
import { postChatReadHandler } from "./postChatReadHandler";
import { postImageHandler } from "./postImageHandler";

export const chatHandler = [rest.post(POST_IMAGE_API_URL, postImageHandler), rest.post(POST_CHAT_READ_API_URL, postChatReadHandler), rest.post(POST_CHAT_API_URL, postChatHandler), rest.post(JOIN_CHAT_URL, joinChatHandler), rest.post(CHAT_INFO_URL, chatInfoHandler), rest.post(CHAT_MESSAGES_API_URL, chatMessagesHandler)];
