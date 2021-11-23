import React from "react";
import { PersonInfoType, ProfileType } from "../../util/type";
import UserContainer from "../../Container/UserContainer";

export default function ProfileComponent({ sex, data, profileRef, idx }: { sex: string; data: PersonInfoType | ProfileType; profileRef: React.RefObject<HTMLDivElement[]>; idx: number }) {
  return <UserContainer sex={sex} data={data} profileRef={profileRef} idx={idx} />;
}
