import { cowDogState, profileModalDatas } from "@Recoil/Atom";
import { makeCategory } from "@Common/util";
import { getCowDogInfo } from "@Common/api";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export const useModalDatasHook = () => {
  const datas = useRecoilValue(cowDogState);
  const [openModal, setOpenModal] = useState<number | null>(null);
  const setModalDatas = useSetRecoilState(profileModalDatas);

  const initModalState = () => setOpenModal(null);

  useEffect(() => {
    if (openModal === null) {
      setModalDatas([]);
      return;
    }

    setModalDatas(() => {
      const data = datas[Number(openModal)];
      const { member } = data;
      const teamPerson = member || [];
      return [data, ...teamPerson];
    });
  }, [openModal, datas]);

  return { openModal, initModalState, setOpenModal };
};

export const useGetUserProfiler = (person: number) => {
  const [datas, setDatas] = useRecoilState(cowDogState);
  const [category, setCategory] = useState<string | null>(null);
  const [dataIndex, setDataIndex] = useState<number>(0);

  const getDatas = async () => {
    try {
      const filterCategory = makeCategory(category);
      const item = await getCowDogInfo(person, 0, filterCategory);
      setDatas(item);
      setDataIndex(1);
    } catch (e) {
      console.log((e as any).message);
    }
  };

  const addDatas = async () => {
    try {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        const filterCategory = makeCategory(category);
        const item = await getCowDogInfo(person, dataIndex, filterCategory);
        setDatas([...datas, ...item]);
        setDataIndex((prev) => prev + 1);
      }
    } catch (e) {
      console.log((e as any).message);
    }
  };

  const handleSetCategory = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const category = target.dataset.id as string;
    setCategory(category);
  };

  useEffect(() => {
    getDatas();
  }, [person, category]);

  useEffect(() => {
    document.addEventListener("scroll", addDatas);
    return () => {
      document.removeEventListener("scroll", addDatas);
    };
  }, [dataIndex, category]);

  return { datas, handleSetCategory };
};
