import { createTeam, getFetch } from "@Util/data";
import { ErrorType, TeamInfoType } from "@Util/type";
import { TEAM_INFO_URL } from "@Util/URL";
import { useState } from "react";

type useLocationSelectHookType = () => [string, (e: React.ChangeEvent<HTMLSelectElement>) => void];
export const useLocationSelectHook: useLocationSelectHookType = () => {
  const [locSelected, setLocSelected] = useState<string>("");
  const handleLocationSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setLocSelected(e.target.value);
  return [locSelected, handleLocationSelected];
};

type returnType = { teamName: string; teamInfo: string; location: string };
type validationFuncType = ({ teamNameRef, teamInfoRef, locSelected }: { teamNameRef: React.RefObject<HTMLInputElement>; teamInfoRef: React.RefObject<HTMLInputElement>; locSelected: string }) => { bool: boolean; value: string | returnType };

export const validationRefData: validationFuncType = ({ teamNameRef, teamInfoRef, locSelected }) => {
  if (!teamNameRef.current || !teamInfoRef.current)
    return {
      bool: false,
      value: "시스템 에러",
    };

  const teamName = teamNameRef.current.value;
  const teamInfo = teamInfoRef.current.value;
  const location = locSelected;

  if (teamName === "") {
    return {
      bool: false,
      value: "팀 이름을 입력해주세요",
    };
  }
  if (location === "") {
    return {
      bool: false,
      value: "지역을 선택해 주세요",
    };
  }
  return {
    bool: true,
    value: { teamName, teamInfo, location },
  };
};

type argsType = returnType & { catchError: (valOrUpdater: ErrorType | ((currVal: ErrorType) => ErrorType)) => void };
type postCreateTeamFuncType = ({ teamName, teamInfo, location, catchError }: argsType) => Promise<{ gid: number; teamData: TeamInfoType } | undefined>;

export const postCreateTeam: postCreateTeamFuncType = async ({ teamName, teamInfo, location, catchError }) => {
  try {
    const [gid, teamData] = await Promise.all([createTeam({ teamName, teamInfo, location }), getFetch({ url: TEAM_INFO_URL, query: "" })]);
    if (gid === "error") throw new Error("팀 생성에 실패했습니다");
    return { gid, teamData };
  } catch (e) {
    catchError({ errorStr: e as string, timeOut: 1000 });
  }
};
