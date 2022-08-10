import React, { useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Input, Button } from "@Atom/.";
import { errorState } from "@Recoil/Atom";
import { changeMyInfo } from "@Common/api";
import { userState } from "@Recoil/UserData";
import { PersonInfoType } from "@Common/type";

export const MyInfoContainer = () => {
  const [myInfo, setMyInfo] = useRecoilState(userState);
  const refArray = useRef<HTMLInputElement[]>([]);
  const setErrorValue = useSetRecoilState(errorState);

  const handleChangeMyInfo = async () => {
    try {
      const changeInfo = makeChangeInfo({ refArray, myInfo });
      await changeMyInfo(changeInfo);
      setMyInfo({
        ...myInfo,
        ...changeInfo,
      });
    } catch (e) {
      setErrorValue({ errorStr: e as string, timeOut: 1000 });
    }
  };

  return (
    <div css={MyInfoContainerStyle}>
      <div className="myinfo-header">
        <span>내 프로필</span>
        <Button size="medium" onClick={handleChangeMyInfo}>
          edit
        </Button>
      </div>
      <div className="myinfo">
        {infoList.map(({ id, value, key }) => (
          <React.Fragment key={id}>
            <span>{value}</span>
            <Input key={id} placeholder={String(myInfo[key])} autoComplete="off" ref={(el) => (refArray.current[id] = el as HTMLInputElement)} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

function validation<T extends string>(value: T, nextValue: T) {
  return value === "" ? nextValue : value;
}

const makeChangeInfo = ({ refArray, myInfo }: { refArray: React.MutableRefObject<HTMLInputElement[]>; myInfo: PersonInfoType }) => {
  if (!refArray.current[0] && !refArray.current[1] && !refArray.current[2] && !refArray.current[3]) throw new Error("시스템 에러");
  return {
    id: validation(refArray.current[0].value, myInfo.id),
    age: Number(refArray.current[1].value) || myInfo.age,
    location: validation(refArray.current[2].value, myInfo.location),
    info: validation(refArray.current[3].value, myInfo.info),
  };
};

const infoList = [
  { id: 0, value: "이름", key: "id" },
  { id: 1, value: "나이", key: "age" },
  { id: 2, value: "주소", key: "location" },
  { id: 3, value: "소개", key: "info" },
];
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
