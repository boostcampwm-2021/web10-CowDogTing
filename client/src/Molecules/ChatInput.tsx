/* eslint-disable no-console */
/** @jsxImportSource @emotion/react */
import React, { useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import ImageSendButton from "../assets/ImageSendButton.svg";
import SendButton from "../assets/SendButton.svg";
import { Input } from "../Atom/Input";
import { chatTarget, userState } from "../Recoil/Atom";
import ClientSocket from "../Socket";

const InputContainer = css`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  align-items: center;
  border-top: 1px solid #ffcfcf;
  height: fit-content;
`;

const sendImageStyle = css`
  background-image: url(${ImageSendButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
`;

const sendButtonStyle = css`
  background-image: url(${SendButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 25px;
  height: 25px;
  margin-left: 10px;
  cursor: pointer;
`;

export default function ChatInput() {
  const { chatRoomId } = useRecoilValue(chatTarget);
  const { id: uid } = useRecoilValue(userState);
  const messageRef = useRef<HTMLInputElement>(null);

  const handleSendMessageClick = () => {
    if (!messageRef.current) return;
    if (!messageRef.current.value) return;

    const chat = messageRef.current.value;

    const { socket } = new ClientSocket(uid);
    socket?.emit("sendChat", { chatRoomId, message: { from: uid, message: chat, read: false, source: "" } });
    messageRef.current.value = "";
  };

  return (
    <div css={InputContainer}>
      <div css={sendImageStyle} />
      <Input placeholder="메시지를 입력하세요" ref={messageRef} />
      <div css={sendButtonStyle} onClick={handleSendMessageClick} />
    </div>
  );
}
