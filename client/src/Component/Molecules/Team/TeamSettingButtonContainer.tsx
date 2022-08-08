import { useRef, useState } from "react";
import { Button } from "../../Atom/Button";
import useDropDownCloseEvent from "../../../Hook/useDropDownCloseEvent";
import { TeamButtonContainer } from "@Hoc/.";
import InviteModal from "../../Template/Modal/InviteModal";

export default function TeamSettingButtonContainer({ clickUpdateButton, clickExitButton }: { clickUpdateButton: React.MouseEventHandler; clickExitButton: React.MouseEventHandler }) {
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
      <Button type="Medium" onClick={clickExitButton}>
        나가기
      </Button>
    </TeamButtonContainer>
  );
}
