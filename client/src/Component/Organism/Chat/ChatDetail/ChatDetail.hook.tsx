import React, { useEffect, useState } from "react";
import { changeNotReadToRead, getChatMessage } from "@Common/api";
import { chatTarget } from "@Recoil/Atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { joinChatRoomState } from "@Recoil/ChatData";
import { joinChatType } from "@Common/type";

export const useGetChatDatasHook = () => {
  const [chatInfo, setChatInfo] = useRecoilState(chatTarget);
  const { chatRoomId, chatMessage: chats } = chatInfo;
  const [dataIndex, setDataIndex] = useState<number>(1);

  const handleAddChat = async (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop !== 0) return;

    const chatMessages = await getChatMessage({ index: dataIndex, chatRoomId });
    if (!chatMessages.length) return;

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

  return { chats, handleAddChat };
};

export const useHandleNotReadChat = () => {
  const [{ chatRoomId }, setChatInfo] = useRecoilState(chatTarget);
  const setJoinChatInfo = useSetRecoilState(joinChatRoomState);

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
};
