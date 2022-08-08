import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { Button } from "@Atom/.";
import { TeamButtonContainer } from "@Hoc/.";

export const TeamCreateButtonContainer = ({ clickCreateButton }: { clickCreateButton: MouseEventHandler }) => {
  return (
    <TeamButtonContainer>
      <Link to="/sub/teamSetting">
        <Button type="Medium" onClick={clickCreateButton}>
          생성
        </Button>
      </Link>
    </TeamButtonContainer>
  );
};
