import { css } from "@emotion/react";
import { Chats } from "@Molecules/.";
import { useGetChatDatasHook, useHandleNotReadChat } from "./ChatDetail.hook";

const ChatContainerStyle = css`
  width: 100%;
  height: 90%;
  padding: 10px 20px 0;
  overflow: auto;
`;
export const ChatDetail = () => {
  const { chats, handleAddChat } = useGetChatDatasHook();
  useHandleNotReadChat();
  // const [currentScrollTop, SetCurrentScrollTop] = useState<number>(0);
  // const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const target = containerRef.current;
  //   if (!target) return;
  //   const scrollValue = target.scrollHeight - target.clientHeight;
  //   target.scrollTo({ top: scrollValue });
  // }, [chatInfo]);

  // useEffect(() => {
  //   if (dataIndex === 1) return;
  //   const target = containerRef.current;
  //   if (!target) return;
  //   target.scrollTo({ top: target.scrollHeight - currentScrollTop });
  // }, [dataIndex]);

  // useEffect(() => {
  //   const target = containerRef.current;
  //   if (!target) return;
  //   SetCurrentScrollTop(target.scrollHeight);
  // }, [chatRoomId, chatInfo, dataIndex]);

  // <div ref={containerRef} css={ChatContainerStyle} onScroll={handleAddChat}>

  return (
    <div css={ChatContainerStyle} onScroll={handleAddChat}>
      <Chats chats={chats} />
    </div>
  );
};
