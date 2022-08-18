import { createTeam, getFetch } from "@Common/api";
import { PersonInfoType, TeamInfoType } from "@Common/type";
import { TEAM_INFO_URL } from "@Common/URL";
import { teamStateSelector } from "@Recoil/TeamData";
import { userStateSelector } from "@Recoil/UserData";
import { useRef, useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";

export const useTeamInfoInputHandler = () => {
  const teamNameRef = useRef<HTMLInputElement>(null);
  const teamInfoRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement[]>([]);
  const resetInputHandler = (locSelected: string, handleLocationInit: () => void) => () => {
    if (!teamNameRef.current || !teamInfoRef.current || locSelected === "") return;
    teamNameRef.current.value = "";
    teamInfoRef.current.value = "";
    handleLocationInit();
  };

  return { teamNameRef, teamInfoRef, profileRef, resetInputHandler };
};

type UseTeamInfoHandler = [TeamInfoType, () => void];
export const useTeamInfoHandler = (): UseTeamInfoHandler => {
  const teamInfoState = useRecoilValue(teamStateSelector);
  const resetTeamInfo = useRecoilRefresher_UNSTABLE(teamStateSelector);
  return [teamInfoState, resetTeamInfo];
};
export const useResetUserAndTeam = () => {
  const resetUser = useRecoilRefresher_UNSTABLE(userStateSelector);
  const resetTeam = useRecoilRefresher_UNSTABLE(teamStateSelector);
  return () => {
    resetUser();
    resetTeam();
  };
};

type useLocationSelectHookType = (location: string) => [string, (e: React.ChangeEvent<HTMLSelectElement>) => void, () => void];
export const useLocationSelectHook: useLocationSelectHookType = (location: string) => {
  const [locSelected, setLocSelected] = useState<string>(location);
  const handleLocationSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setLocSelected(e.target.value);
  const handleLocationInit = () => setLocSelected("");
  return [locSelected, handleLocationSelected, handleLocationInit];
};

type returnType = { teamName: string; teamInfo: string; location: string };
type validationArgsType = { teamNameRef: React.RefObject<HTMLInputElement>; teamInfoRef: React.RefObject<HTMLInputElement>; locSelected: string };
type validationFuncType = ({ teamNameRef, teamInfoRef, locSelected }: validationArgsType) => returnType | undefined;
export const validationRefData: validationFuncType = ({ teamNameRef, teamInfoRef, locSelected }) => {
  if (!teamNameRef.current || !teamInfoRef.current) throw new Error("시스템 에러");

  const teamName = teamNameRef.current.value;
  const teamInfo = teamInfoRef.current.value;
  const location = locSelected;

  if (teamName === "") throw new Error("팀 이름을 입력해주세요");
  if (location === "") throw new Error("지역을 선택해 주세요");
  return { teamName, teamInfo, location };
};

type postCreateTeamFuncType = ({ teamName, teamInfo, location }: returnType) => Promise<boolean>;
export const postCreateTeam: postCreateTeamFuncType = async ({ teamName, teamInfo, location }) => {
  try {
    await Promise.all([createTeam({ teamName, teamInfo, location }), getFetch({ url: TEAM_INFO_URL, query: "" })]);
    return true;
  } catch (e) {
    throw new Error("팀 생성에 실패했습니다");
  }
};

type teamUpdateDataValidationArgsType = validationArgsType & {
  teamInfoState: TeamInfoType;
  userInfoState: PersonInfoType;
};
export const teamUpdateDataValidation = ({ teamNameRef, teamInfoRef, locSelected, teamInfoState, userInfoState }: teamUpdateDataValidationArgsType) => {
  if (!teamNameRef.current && !teamInfoRef.current && !locSelected && !teamInfoState.id) throw new Error("시스템 에러");
  if (teamInfoState.leader !== userInfoState.id) throw new Error("팀 리더가 아닙니다");
  return {
    teamName: teamNameRef?.current?.value || teamInfoState.id,
    teamInfo: teamInfoRef?.current?.value || teamInfoState.info,
    location: locSelected ?? teamInfoState.location,
  };
};
