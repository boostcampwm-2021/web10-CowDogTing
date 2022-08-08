import { useRef, useState } from "react";
import { Button } from "@Atom/.";
import useDropDownCloseEvent from "@Hook/useDropDownCloseEvent";
import { TeamButtonContainer } from "@Hoc/.";
import InviteModal from "../../Template/Modal/InviteModal";

type props = { clickUpdateButton: React.MouseEventHandler; clickExitButton: React.MouseEventHandler };
export const TeamSettingButtonContainer = ({ clickUpdateButton, clickExitButton }: props) => {
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
};
