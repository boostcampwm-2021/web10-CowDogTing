import React from "react";
import { css } from "@emotion/react";
import { URL } from "@Util/URL";

export type ChatProps = { from: string; type: "Mine" | "Other"; message: string; src: string | null };

export const Chat = ({ from, type, message, src }: ChatProps) => {
  return (
    <div css={ChatContainerStyle({ type })}>
      <div>{from}</div>
      {src ? <img alt="ProfileImage" src={String(URL + src)} css={ImageStyle} /> : <div css={ChatTypeStyle({ type })}>{message}</div>}
    </div>
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

const ChatTypeStyle = (props: { type: string }) => css`
  display: inline-flex;
  margin-top: 10px;
  max-width: 50%;
  ${props.type === "Mine" && MyChatStyle}
  ${props.type === "Other" && OtherChatStyle}
`;

const ChatContainerStyle = (props: { type: string }) => css`
  margin: 10px 0;
  width: 100%;
  ${props.type === "Mine" && MySendStyle}
`;

const ImageStyle = css`
  width: 100px;
  height: 100px;
`;
