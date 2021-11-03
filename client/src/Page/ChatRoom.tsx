/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import ChatDetail from "../Template/ChatDetail";
import { Input } from "../Atom/Input";
import ImageSendButton from "../assets/ImageSendButton.svg";
import SendButton from "../assets/SendButton.svg";

const ChatRoomStyle = css`
  width: 400px;
  height: 100vh;
  border-right: 1px solid #000000;
`;

const InputContainer = css`
  display: flex;
  justify-content: center;
  padding: 10px 0 10px 0;
  align-items: center;
  height: 10%;
  min-height: 100px;
  border-top: 1px solid #ffcfcf;
`;

const sendImageStyle = css`
  background-image: url(${ImageSendButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
const sendButtonStyle = css`
  background-image: url(${SendButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

export default function ChatRoom() {
  const searchParams = new URLSearchParams(useLocation().search);
  const chatRoomID = Number(searchParams.get("chatRoomID"));

  return (
    <div css={ChatRoomStyle}>
      <ChatDetail chatRoomID={chatRoomID} />
      <div css={InputContainer}>
        <div css={sendImageStyle} />
        <Input placeholder="메시지를 입력하세요" />
        <div css={sendButtonStyle} />
      </div>
    </div>
  );
}
