/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { css } from "@emotion/react";
import { PersonInfoType } from "../util/type";
import { Button } from "../Atom/Button";
import ChatRoomBasic from "../Molecules/ChatRoomBasic";
import ChatRoomGame from "../Molecules/ChatRoomGame";
import ChatRoomGather from "./ChatRoomGather";
import ChatRoomFooter from "../Molecules/ChatRoomFooter";
import { chatsState, chatTarget } from "../Recoil/Atom";

const headerStyle = css`
  display: flex;
  justify-content: end;
  padding: 30px;
`;

export default function ChatRoomRight() {
  const { chatRoomId } = useRecoilValue(chatTarget);
  const chatsInfo = useRecoilValue(chatsState);

  const [member, setMember] = useState<PersonInfoType[] | null>(null);
  const history = useHistory();

  const getMember = async () => {
    setMember(chatsInfo.filter((data) => data.chatRoomId === chatRoomId)[0].member);
  };

  useEffect(() => {
    getMember();
  }, [chatRoomId]);

  const handleCloseRoomClick = () => {
    history.goBack();
  };

  return (
    <div style={{ width: "100%" }}>
      <div css={headerStyle}>
        <Button type="Small" onClick={handleCloseRoomClick}>
          나가기
        </Button>
      </div>
      <Switch>
        <Route path="/ChatRoom" component={() => ChatRoomBasic({ member })} exact />
        <Route path="/ChatRoom/Game" component={ChatRoomGame} />
        <Route path="/ChatRoom/Gather" component={ChatRoomGather} />
      </Switch>
      <ChatRoomFooter />
    </div>
  );
}
