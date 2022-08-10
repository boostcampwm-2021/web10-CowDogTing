import React from "react";
import { css } from "@emotion/react";
import { URL } from "@Util/URL";
import styled from "@emotion/styled";

export type ChatProps = { from: string; type: "Mine" | "Other"; message: string; src: string | null };

export const Chat = ({ from, type, message, src }: ChatProps) => {
  return (
    <ChatContainer type={type}>
      <div>{from}</div>
      {src ? <img alt="ProfileImage" src={String(URL + src)} css={ImageStyle} /> : <ChatType type={type}>{message}</ChatType>}
    </ChatContainer>
  );
};

const MyChatStyle = css`
  background: #b0c2ff;
  border: 1px solid #b0c2ff;
  border-radius: 8px 0px 8px 8px;
  color: #ffffff;
  padding: 8px;
`;
const OtherChatStyle = css`
  background: #ffcfcf;
  border: 1px solid #ffcfcf;
  border-radius: 0px 8px 8px 8px;
  padding: 8px;
`;

const MySendStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

type stylesType = { type: string };
const ChatTypeStyle = (props: stylesType) => css`
  display: inline-flex;
  margin-top: 10px;
  max-width: 50%;
  ${props.type === "Mine" && MyChatStyle}
  ${props.type === "Other" && OtherChatStyle}
`;

const ChatType = styled.div<stylesType>`
  ${ChatTypeStyle}
`;

const ChatContainerStyle = (props: stylesType) => css`
  ${props.type === "Mine" && MySendStyle}
`;
const ChatContainer = styled.div<stylesType>`
  margin: 10px 0;
  width: 100%;
  ${ChatContainerStyle}
`;

const ImageStyle = css`
  width: 100px;
  height: 100px;
`;
