import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { errorState, profileModalDatas, requestTarget } from "@Recoil/Atom";
import { teamState } from "@Recoil/TeamData";
import { userState } from "@Recoil/UserData";
import { requestChat } from "@Common/api";
import { ProfileType } from "@Common/type";

export const useRequestDate = () => {
  const [request, setRequest] = useState<boolean>(false);
  const datas = useRecoilValue(profileModalDatas);
  const { id: myId } = useRecoilValue(userState);
  const { leader } = useRecoilValue(teamState);
  const setRequestTarget = useSetRecoilState(requestTarget);
  const setErrorValue = useSetRecoilState(errorState);

  const handleRequestClick = async () => {
    try {
      if (datas.length > 1 && myId !== leader) throw new Error("팀 리더에게 문의하세요.");
      await requestChat({ from: myId, to: datas.length === 1 ? datas[0].id : datas[0].gid ?? 0 });
      setRequestTarget(datas[0]);
      setRequest(true);
    } catch (e) {
      setErrorValue({ errorStr: e as string, timeOut: 1000 });
    }
  };

  return { request, setRequest, datas, handleRequestClick };
};

export const useDataIndex = (datas: ProfileType[]) => {
  const [index, setIndex] = useState<number>(0);
  const [target, setTarget] = useState<ProfileType | null>(datas[0]);

  const inCreaseIndex = useCallback((): void => {
    setIndex((prev) => prev + 1);
    setTarget(datas ? datas[index] : null);
  }, [datas]);

  const decreaseIndex = useCallback((): void => {
    setIndex((prev) => prev - 1);
    setTarget(datas ? datas[index] : null);
  }, [datas]);

  useEffect(() => {
    setTarget(datas[0]);
    setIndex(0);
  }, [datas]);

  useEffect(() => {
    if (!datas) return;
    setTarget(datas[index]);
  }, [index]);

  return { inCreaseIndex, decreaseIndex, index, target };
};
