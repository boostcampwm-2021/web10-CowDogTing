/* eslint-disable no-return-assign */

import { useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "../../Atom/Button";
import { Input } from "../../Atom/Input";
import { errorState, userState } from "../../../Recoil/Atom";
import { changeMyInfo } from "../../../Util/data";

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
  const setErrorValue = useSetRecoilState(errorState);

  const refArray = useRef<HTMLInputElement[]>([]);

  const handleChangeMyInfo = async () => {
    if (!refArray.current[0] && !refArray.current[1] && !refArray.current[2] && !refArray.current[3]) return;

    const changeInfo = {
      id: refArray.current[0].value || myInfo.id,
      age: Number(refArray.current[1].value) || myInfo.age,
      location: refArray.current[2].value || myInfo.location,
      info: refArray.current[3].value || myInfo.info,
    };

    const result = await changeMyInfo(changeInfo);
    if (result) {
      setMyInfo({
        ...myInfo,
        ...changeInfo,
      });
    } else {
      setErrorValue({ errorStr: "내 정보 수정에 실패했습니다", timeOut: 1000 });
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
