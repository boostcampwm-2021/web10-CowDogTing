import React, { useRef } from "react";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@Core/.";
import { ProfileList } from "@Template/Profile/ProfileList";
import { ProfileModal } from "@Template/Modal/ProfileModal";
import useModalCloseEvent from "@Hook/useModalCloseEvent";
import { handleModalClick } from "@Util/.";
import { useGetUserProfiler, useModalDatasHook } from "./CowDogPage.hook";

const ListContainer = css`
  margin: 0 auto;
`;

export const CowDogPage: React.FC = () => {
  // if (!checkLogin()) passToLoginPage();
  const searchParams = new URLSearchParams(useLocation().search);
  const person = Number(searchParams.get("person"));

  const { datas, handleSetCategory } = useGetUserProfiler(person);
  const { openModal, setOpenModal, initModalState } = useModalDatasHook();

  const profileRef = useRef<HTMLDivElement[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  useModalCloseEvent(modalRef, profileRef, initModalState);
  const handleProfileListContainer = handleModalClick(profileRef, setOpenModal);

  return (
    <div>
      <Navbar handleSetCategory={handleSetCategory} />
      <div css={ListContainer}>
        <ProfileList datas={datas} person={person} handleProfileListContainer={handleProfileListContainer} profileRef={profileRef} />
        <div ref={modalRef}>{datas && openModal !== null && <ProfileModal />}</div>
      </div>
    </div>
  );
};
