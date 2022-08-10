import { profileModalDatas } from "@Recoil/Atom";
import { teamState } from "@Recoil/TeamData";
import { userState } from "@Recoil/UserData";
import { RequestType } from "@Common/type";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const usePropsTypeHook = (type: string) => {
  const teamInfo = useRecoilValue(teamState);
  const userInfo = useRecoilValue(userState);
  return checkLeader(teamInfo.leader, userInfo.id) ? type : "NotLeader";
};

const checkLeader = (leader: string, target: string) => leader === target;

type ReturnType = [number | null, React.Dispatch<React.SetStateAction<number | null>>];
export const useRequestModalStateControl = (datas: RequestType[]): ReturnType => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const setModalDatas = useSetRecoilState(profileModalDatas);
  useEffect(() => {
    const data = datas[Number(openModal)].info;
    setModalDatas([data, ...(data.member ?? [])]);
  }, [openModal]);
  return [openModal, setOpenModal];
};
