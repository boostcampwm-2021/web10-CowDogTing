import React from "react";
import { PersonInfoType, ProfileType } from "../../../Util/type";
import { UserContainer } from "@Hoc/.";

type props = { sex: string; data: PersonInfoType | ProfileType; profileRef: React.RefObject<HTMLDivElement[]>; idx: number };
export const ProfileComponent: React.FC<props> = ({ sex, data, profileRef, idx }) => {
  return <UserContainer sex={sex} data={data} profileRef={profileRef} idx={idx} />;
};
