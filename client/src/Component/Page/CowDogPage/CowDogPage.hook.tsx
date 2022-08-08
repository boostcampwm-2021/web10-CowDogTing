import { cowDogState, profileModalDatas } from "@Recoil/Atom";
import { makeCategory } from "@Util/.";
import { getCowDogInfo } from "@Util/data";
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
    const filterCategory = makeCategory(category);
    const item = await getCowDogInfo(person, 0, filterCategory);
    const temp = item.length === 0 ? dummy : item;
    setDatas(temp);
    setDataIndex(1);
  };

  const addDatas = async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      const filterCategory = makeCategory(category);
      const item = await getCowDogInfo(person, dataIndex, filterCategory);
      setDatas([...datas, ...item]);
      setDataIndex((prev) => prev + 1);
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

const dummy = [
  {
    id: "1",
    image: null,
    location: "서울",
    sex: "남성",
    age: 25,
    info: "hihi",
    gid: 1,
    idx: 1,
    member: [
      {
        id: "2",
        image: null,
        location: "서울",
        sex: "남성",
        age: 25,
        info: "hihi",
        gid: 1,
        idx: 2,
      },
      {
        id: "3",
        image: null,
        location: "서울",
        sex: "남성",
        age: 25,
        info: "hihi",
        gid: 1,
        idx: 3,
      },
    ],
  },
  {
    id: "4",
    image: null,
    location: "서울",
    sex: "남성",
    age: 25,
    info: "hihi",
    gid: 2,
    idx: 4,
    member: [
      {
        id: "5",
        image: null,
        location: "서울",
        sex: "남성",
        age: 25,
        info: "hihi",
        gid: 2,
        idx: 5,
      },
      {
        id: "6",
        image: null,
        location: "서울",
        sex: "남성",
        age: 25,
        info: "hihi",
        gid: 2,
        idx: 6,
      },
    ],
  },
];
