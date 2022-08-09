import { useRef } from "react";
import { Button } from "@Atom/.";
import useDropDownCloseEvent from "@Hook/useDropDownCloseEvent";
import { TeamButtonContainer } from "@Hoc/.";
import InviteModal from "@Template/Modal/InviteModal";
import { useToggleHook } from "@Hook/useToggleHook";

type props = { clickUpdateButton: React.MouseEventHandler; clickExitButton: React.MouseEventHandler };
export const TeamSettingButtonContainer = ({ clickUpdateButton, clickExitButton }: props) => {
  const [inviteModalState, handleToggleInvite, handleFalseInvite] = useToggleHook();
  const modalRef = useRef<HTMLInputElement>(null);
  useDropDownCloseEvent(modalRef, handleFalseInvite);

  return (
    <TeamButtonContainer>
      <div ref={modalRef}>
        <Button size="Medium" onClick={handleToggleInvite}>
          초대하기
        </Button>
        {inviteModalState && <InviteModal handleFalseInvite={handleFalseInvite} />}
      </div>
      <Button size="Medium" onClick={clickUpdateButton}>
        수정하기
      </Button>
      <Button size="Medium" onClick={clickExitButton}>
        나가기
      </Button>
    </TeamButtonContainer>
  );
};
