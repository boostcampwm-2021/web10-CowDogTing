/* eslint-disable no-return-assign */
/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { css } from "@emotion/react";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";
import InfoContainer from "./InfoContainer";
import { errorState, userState } from "../Recoil/Atom";
import { changeMyInfo } from "../util/data";

const MyInfoStyle = css`
  padding-left: 50px;
  width: 60vw;
  display: flex;
  align-items: center;
`;

export default function UserInfoContainer() {
  const [myInfo, setMyInfo] = useRecoilState(userState);
  const { id, location, age, info } = myInfo;
  const setErrorValue = useSetRecoilState(errorState);

  const refArray = useRef<HTMLInputElement[]>([]);

  const handleChangeMyInfo = async () => {
    if (!refArray.current[0] || !refArray.current[1] || !refArray.current[2] || !refArray.current[3]) return;

    const changeInfo = { id: refArray.current[0].value, location: refArray.current[1].value, age: Number(refArray.current[2].value), info: refArray.current[3].value };
    const result = await changeMyInfo(changeInfo);

    if (result === "success") {
      setMyInfo({
        ...myInfo,
        ...changeInfo,
      });
    } else if (result === "error") {
      setErrorValue({ errorStr: "내 정보 수정에 실패했습니다", timeOut: 1000 });
    }
  };
  return (
    <div css={MyInfoStyle}>
      <div className="myinfo-header">
        <span>내 프로필</span>
        <Button type="medium" onClick={handleChangeMyInfo}>
          edit
        </Button>
      </div>
      <InfoContainer>
        <p>이름</p>
        <Input placeholder={id} autoComplete="off" ref={(el) => (refArray.current[0] = el as HTMLInputElement)} />
        <p>나이</p>
        <Input placeholder={String(age)} autoComplete="off" ref={(el) => (refArray.current[1] = el as HTMLInputElement)} />
        <p>주소</p>
        <Input placeholder={location} autoComplete="off" ref={(el) => (refArray.current[2] = el as HTMLInputElement)} />
        <p>소개</p>
        <Input placeholder={info} autoComplete="off" ref={(el) => (refArray.current[3] = el as HTMLInputElement)} />
      </InfoContainer>
    </div>
  );
}
