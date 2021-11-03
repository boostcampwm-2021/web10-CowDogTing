/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
  float: right;
`;
const OtherSendStyle = css`
  float: left;
`;

const ChatTypeStyle = (props: { type: string }) => css`
  display: inline-flex;
  margin-top: 10px;
  ${props.type === "Mine" && MyChatStyle}
  ${props.type === "Other" && OtherChatStyle}
`;

const ChatContainerStyle = (props: { type: string }) => css`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  max-width: 150px;
  ${props.type === "Mine" && MySendStyle}
  ${props.type === "Other" && OtherSendStyle}
`;

export default function Chat({ type, children }: { type: string; children: string[] }) {
  return (
    <div css={ChatContainerStyle({ type })}>
      <div>{children[0]}</div>
      <div css={ChatTypeStyle({ type })}>{children[1]}</div>
    </div>
  );
}
