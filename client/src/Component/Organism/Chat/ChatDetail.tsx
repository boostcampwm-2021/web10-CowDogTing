/* eslint-disable no-console */

import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import { chatTarget } from "../../../Recoil/Atom";
import { joinChatRoomState } from "@Recoil/ChatData";
import { changeNotReadToRead, getChatMessage } from "../../../Util/data";
import { Chats } from "@Molecules/.";
import { joinChatType } from "../../../Util/type";

const ChatContainerStyle = css`
  width: 100%;
  height: 90%;
  padding: 10px 20px 0;
  overflow: auto;
`;
export default function ChatDetail() {
  const [chatInfo, setChatInfo] = useRecoilState(chatTarget);
  const { chatRoomId, chatMessage: chats } = chatInfo;
  const setJoinChatInfo = useSetRecoilState(joinChatRoomState);
  const [dataIndex, setDataIndex] = useState<number>(1);
  const [currentScrollTop, SetCurrentScrollTop] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddChat = async (e: React.UIEvent<HTMLElement>) => {
    const target = containerRef.current;
    if (!target) return;

    const { scrollTop } = e.currentTarget;
    if (scrollTop !== 0) return;

    const chatMessages = await getChatMessage({ index: dataIndex, chatRoomId });
    if (!chatMessages.length || chatMessages === "error") return;

    setChatInfo((prev) => {
      return {
        ...prev,
        chatMessage: [...chatMessages, ...chats],
      };
    });
    setDataIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const index = chats.length / 10;
    setDataIndex(index);
  }, [chatRoomId]);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    const scrollValue = target.scrollHeight - target.clientHeight;
    target.scrollTo({ top: scrollValue });
  }, [chatInfo]);

  useEffect(() => {
    if (dataIndex === 1) return;
    const target = containerRef.current;
    if (!target) return;
    target.scrollTo({ top: target.scrollHeight - currentScrollTop });
  }, [dataIndex]);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    SetCurrentScrollTop(target.scrollHeight);
  }, [chatRoomId, chatInfo, dataIndex]);

  useEffect(() => {
    changeNotReadToRead(chatRoomId);
    setJoinChatInfo((prev: joinChatType[]) =>
      prev.map((item: joinChatType) => {
        if (item.chatRoomId !== chatRoomId) return item;
        return {
          ...item,
          notReadNum: 0,
        };
      })
    );

    return () => {
      changeNotReadToRead(chatRoomId);
      setChatInfo({
        chatRoomId: 0,
        member: [],
        chatMessage: [],
      });
    };
  }, []);

  return (
    <div ref={containerRef} css={ChatContainerStyle} onScroll={handleAddChat}>
      <Chats />
    </div>
  );
}