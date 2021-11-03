/* eslint-disable react/destructuring-assignment */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import { getChatInfo } from "../util/dummyData";
import { PersonInfoType } from "../util/type";
import { Button } from "../Atom/Button";
import ChatRoomBasic from "../Molecules/ChatRoomBasic";
import ChatRoomGame from "../Molecules/ChatRoomGame";
import ChatRoomGather from "./ChatRoomGather";
import VideoSupport from "../Molecules/VideoSupport";

const headerStyle = css`
  display: flex;
  justify-content: end;
  padding: 30px;
`;

const footerStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 50px;
`;

export default function ChatRoomRight(props: { chatRoomID: number }) {
  const [member, setMember] = useState<PersonInfoType[] | null>(null);
  const history = useHistory();

  const getMember = async () => {
    const { data: datas } = await getChatInfo();
    setMember(datas.filter((data) => data.chatRoomID === props.chatRoomID)[0].member);
  };

  useEffect(() => {
    getMember();
  }, [props.chatRoomID]);

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
        <Route path="/ChatRoom" component={() => ChatRoomBasic({ member })} />
        <Route path="/ChatRoom/Game" component={ChatRoomGame} />
        <Route path="/ChatRoom/Gather" component={ChatRoomGather} />
      </Switch>
      <div css={footerStyle}>
        <VideoSupport type="basic" />
        <div style={{ display: "flex" }}>
          <Button type="Small">게임하기</Button>
          <Button type="Small">게더타운</Button>
        </div>
      </div>
    </div>
  );
}
