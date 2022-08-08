/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { ProfileCard, ProfileImage } from "@Atom/.";
import { ProfileImageContainer } from "@Hoc/.";
import { ChatProfileInfoContainer } from "@Molecules/Chat/ChatProfileInfoContainer";
import { ChatInfoType } from "@Util/type";
const dummyImage = "Asset/meetingImage.png";

export default function ChatProfile({ data, idx, chatRoomRef }: { data: ChatInfoType; idx: number; chatRoomRef: React.MutableRefObject<HTMLDivElement[]> }) {
  const memberType = data.member.length > 2 ? "team" : data.member[0].sex;
  const lastChatInfo = data.chatMessage[data.chatMessage.length - 1];
  return (
    <div data-id={idx} ref={(el) => ((chatRoomRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)}>
      <ProfileCard type={memberType}>
        <ProfileImageContainer>
          <ProfileImage type="Small" image={dummyImage} />
        </ProfileImageContainer>
        <ChatProfileInfoContainer lastChat={lastChatInfo.message} from={lastChatInfo.from} />
      </ProfileCard>
    </div>
  );
}
