import { ProfileCard } from "@Atom/.";
import { ProfileImageContainer } from "@Hoc/.";
import { ChatProfileInfoContainer } from "@Molecules/Chat/ChatProfileInfoContainer";
import { ChatInfoType } from "@Common/type";

type props = { data: ChatInfoType; idx: number; chatRoomRef: React.MutableRefObject<HTMLDivElement[]> };
export const ChatProfile = ({ data, idx, chatRoomRef }: props) => {
  const memberType = data.member.length > 2 ? "team" : data.member[0].sex;
  const lastChatInfo = data.chatMessage[data.chatMessage.length - 1];
  return (
    <div data-id={idx} ref={(el) => ((chatRoomRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)}>
      <ProfileCard type={memberType}>
        <ProfileImageContainer />
        <ChatProfileInfoContainer lastChat={lastChatInfo.message} from={lastChatInfo.from} />
      </ProfileCard>
    </div>
  );
};
