/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";
import { userState } from "../Recoil/Atom";
import { changeMyInfo } from "../util";

const MyInfoContainerStyle = css`
  width: 350px;
  height: 80vh;
  text-align: start;
  padding-top: 20px;
  .myinfo-header {
    height: 10vh;
    align-items: center;
    span {
      font-size: 32px;
    }
    display: flex;
    justify-content: space-between;
  }
  .myinfo {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 20px;
    height: 60vh;
  }
`;
export default function MyInfoContainer() {
  const [myInfo, setMyInfo] = useRecoilState(userState);

  const { id, location, age, info } = myInfo;
  const idInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const infoInputRef = useRef<HTMLInputElement>(null);

  // 복붙

  const handleChangeMyInfo = async () => {
    if (!idInputRef.current || !ageInputRef.current || !locationInputRef.current || !infoInputRef.current) return;

    const data = await changeMyInfo({ id: idInputRef.current.value, location: locationInputRef.current.value, age: Number(ageInputRef.current.value), info: infoInputRef.current.value });

    if (data) {
      setMyInfo({
        ...myInfo,
        id: idInputRef.current.value,
        location: locationInputRef.current.value,
        age: Number(ageInputRef.current.value),
        info: infoInputRef.current.value,
      });
    } else {
      console.log("myInfo 수정 실패");
    }
  };
  return (
    <>
      <div css={MyInfoContainerStyle}>
        <div className="myinfo-header">
          <span>내 프로필</span>
          <Button type="medium" onClick={handleChangeMyInfo}>
            edit
          </Button>
        </div>
        <div className="myinfo">
          <span>이름</span>
          <Input placeholder={id} autoComplete="off" ref={idInputRef} />
          <span>나이</span>
          <Input placeholder={String(age)} autoComplete="off" ref={ageInputRef} />
          <span>주소</span>
          <Input placeholder={location} autoComplete="off" ref={locationInputRef} />
          <span>소개</span>
          <Input placeholder={info} autoComplete="off" ref={infoInputRef} />
        </div>
      </div>
    </>
  );
}
