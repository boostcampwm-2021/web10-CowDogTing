import { useRef, useState } from "react";
import { Button } from "../Atom/Button";
import useDropDownCloseEvent from "../Hook/useDropDownCloseEvent";
import TeamButtonContainer from "../Container/TeamButtonContainer";
import InviteModal from "../Template/InviteModal";

export default function TeamSettingButtonContainer({ clickUpdateButton }: { clickUpdateButton: React.MouseEventHandler }) {
  const [inviteModalState, setInviteModalState] = useState(false);
  const modalRef = useRef<HTMLInputElement>(null);
  useDropDownCloseEvent(modalRef, () => setInviteModalState(false));

  return (
    <TeamButtonContainer>
      <div ref={modalRef}>
        <Button
          type="Medium"
          onClick={() => {
            setInviteModalState((prev) => !prev);
          }}
        >
          초대하기
        </Button>
        {inviteModalState && <InviteModal setInviteModalState={setInviteModalState} />}
      </div>
      <Button type="Medium" onClick={clickUpdateButton}>
        수정하기
      </Button>
    </TeamButtonContainer>
  );
}
