import { cowDogState, errorState, profileModalDatas } from "@Recoil/Atom";
import { makeCategory, useThrottle } from "@Common/util";
import { getCowDogInfo } from "@Common/api";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { string } from "prop-types";

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
  const setError = useSetRecoilState(errorState);

  const getDatas = async () => {
    try {
      const filterCategory = makeCategory(category);
      const item = await getCowDogInfo(person, 0, filterCategory);
      setDatas(item.length === 0 ? makeDummyProfileData() : item);
      setDataIndex(1);
    } catch (e) {
      setError((e as any).message);
    }
  };

  const addDatas = useCallback(async () => {
    try {
      const filterCategory = makeCategory(category);
      const item = await getCowDogInfo(person, dataIndex, filterCategory);
      const temp = item.length === 0 ? makeDummyProfileData() : item;
      setDatas([...datas, ...temp]);
      setDataIndex((prev) => prev + 1);
    } catch (e) {
      setError((e as any).message);
    }
  }, [person, dataIndex, category]);

  const onScroll = useCallback(() => {
    // console.log("동작!");
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) addDatas();
  }, [addDatas]);

  const handleSetCategory = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const category = target.dataset.id as string;
    setCategory(category);
  };

  useEffect(() => {
    getDatas();
  }, [person, category]);

  const throttleScrollEvent = useCallback(useThrottle(onScroll, 300), [onScroll]);
  useEffect(() => {
    // document.addEventListener("scroll", onScroll);
    document.addEventListener("scroll", throttleScrollEvent);
    return () => {
      // document.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", throttleScrollEvent);
    };
    // }, [onScroll]);
  }, [throttleScrollEvent]);

  return { datas, handleSetCategory };
};

const makeDummyProfileData = () =>
  Array.from({ length: 100 }, (x, i) => ({
    id: String(i),
    image: null,
    location: "서울",
    sex: "male",
    age: Math.floor(Math.random() * 10) + 20,
    info: String(Math.floor(Math.random() * 100)),
  }));
