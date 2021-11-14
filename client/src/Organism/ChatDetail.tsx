/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
import Chats from "../Molecules/Chats";
import { chatTarget } from "../Recoil/Atom";
import { getChatMessage } from "../util/data";

const ChatContainerStyle = css`
  width: 100%;
  height: 90%;
  padding: 10px 20px 0;
  overflow: auto;
`;
export default function ChatDetail() {
  const [chatInfo, setChatInfo] = useRecoilState(chatTarget);
  const { chatRoomId, chatMessage: chats } = chatInfo;
  const [dataIndex, setDataIndex] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const test = async (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop } = e.currentTarget;

    if (scrollTop === 0) {
      const chatMessages = await getChatMessage({ index: dataIndex, chatRoomId });
      setChatInfo((prev) => {
        return {
          ...prev,
          chatMessage: [...chatMessages, ...chats],
        };
      });
      setDataIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setDataIndex(1);
  }, [chatRoomId]);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    const scrollValue = target.scrollHeight - target.clientHeight;
    target.scrollTo({ top: scrollValue });
  }, [chatRoomId]);

  return (
    <div ref={containerRef} css={ChatContainerStyle} onScroll={test}>
      <Chats />
    </div>
  );
}
