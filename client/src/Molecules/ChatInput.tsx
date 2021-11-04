/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ImageSendButton from "../assets/ImageSendButton.svg";
import SendButton from "../assets/SendButton.svg";
import { Input } from "../Atom/Input";

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

export default function ChatInput() {
  return (
    <div css={InputContainer}>
      <div css={sendImageStyle} />
      <Input placeholder="메시지를 입력하세요" />
      <div css={sendButtonStyle} />
    </div>
  );
}
