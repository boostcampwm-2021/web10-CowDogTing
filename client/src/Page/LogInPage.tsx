import React from "react";
import { Button } from "../Atom/Button";

export default function LogInPage() {
  return (
    <>
      <Button type="Small">나가기</Button>
      <Button type="Medium">초대하기</Button>
      <Button type="Large">채팅 신청하기</Button>
      <Button type="Long" color="#000000">
        Sign in with Github
      </Button>
      <Button type="Long" color="#f3e84d">
        Sign in with Kakao
      </Button>
      <Button type="Long" color="#2DB400">
        Sign in with Naver
      </Button>
      <Button type="SmallDropDown">드랍다운</Button>
      <Button type="LargeDropDown">드랍다운1</Button>
      <Button type="State" color="#CAABFB">
        그룹 승인
      </Button>
      <Button type="State" color="#CFDAFF">
        남자 상태
      </Button>
    </>
  );
}
