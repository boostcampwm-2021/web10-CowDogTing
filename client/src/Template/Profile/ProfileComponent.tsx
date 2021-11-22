import React from "react";
import { PersonInfoType, ProfileType } from "../../util/type";
import UserContainer from "../../Container/UserContainer";

export default function ProfileComponent({ sex, data, ref, idx }: { sex: string; data: PersonInfoType | ProfileType; ref: React.RefObject<HTMLDivElement[]>; idx: number }) {
  return <UserContainer sex={sex} data={data} ref={ref} idx={idx} />;
}
