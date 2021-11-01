import React from "react";
import { Button } from "../Atom/Button";
import Test from "../Atom/test";

export default function LogInPage() {
  return (
    <>
      <Button type="Small">나가기</Button>
      <Button type="Medium">초대하기</Button>
      <Button type="Large">채팅 신청하기</Button>
      <Button type="Long">5</Button>
      <Button type="DropDown">드랍다운</Button>
      <Test />
    </>
  );
}
