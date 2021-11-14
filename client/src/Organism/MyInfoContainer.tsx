/* eslint-disable no-return-assign */
/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { Button } from "../Atom/Button";
import { Input } from "../Atom/Input";
import { userState } from "../Recoil/Atom";
import { changeMyInfo } from "../util/data";

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

  const refArray = useRef<HTMLInputElement[]>([]);

  const handleChangeMyInfo = async () => {
    if (!refArray.current[0] || !refArray.current[1] || !refArray.current[2] || !refArray.current[3]) return;

    const changeInfo = { id: refArray.current[0].value, location: refArray.current[1].value, age: Number(refArray.current[2].value), info: refArray.current[3].value };
    const data = await changeMyInfo(changeInfo);

    if (data) {
      setMyInfo({
        ...myInfo,
        ...changeInfo,
      });
    } else {
      alert("myinfo 수정 실패");
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
          <Input placeholder={id} autoComplete="off" ref={(el) => (refArray.current[0] = el as HTMLInputElement)} />
          <span>나이</span>
          <Input placeholder={String(age)} autoComplete="off" ref={(el) => (refArray.current[1] = el as HTMLInputElement)} />
          <span>주소</span>
          <Input placeholder={location} autoComplete="off" ref={(el) => (refArray.current[2] = el as HTMLInputElement)} />
          <span>소개</span>
          <Input placeholder={info} autoComplete="off" ref={(el) => (refArray.current[3] = el as HTMLInputElement)} />
        </div>
      </div>
    </>
  );
}
