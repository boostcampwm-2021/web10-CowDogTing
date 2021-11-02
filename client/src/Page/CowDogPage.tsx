/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCowDogPersonInfo, getCowDogTeamInfo } from "../util/dummyData";
import { PersonInfoType, TeamInfoType } from "../util/type";

export default function CowDogPage() {
  const searchParams = new URLSearchParams(useLocation().search);
  const person = Number(searchParams.get("person"));
  const [personDatas, setPersonDatas] = useState<PersonInfoType[] | null>(null);
  const [teamDatas, setTeamDatas] = useState<TeamInfoType[] | null>(null);

  const getDatas = async () => {
    if (person === 1) {
      const item = await getCowDogPersonInfo();
      setPersonDatas(item);
    } else {
      const item = await getCowDogTeamInfo(person);
      setTeamDatas(item);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div>
      {personDatas?.map((data): React.ReactElement | undefined => {
        const { id, image, location, sex, age } = data;
        return (
          <>
            <div>{id}</div>
            <div>{image}</div>
            <div>{location}</div>
            <div>{sex}</div>
            <div>{age}</div>
          </>
        );
      })}
      {teamDatas?.map((data): React.ReactElement | undefined => {
        const { image, teamID, info, time, location, age, leader, teamPersonNum, sex, member } = data;

        return (
          <>
            <div>{image}</div>
            <div>{teamID}</div>
            <div>{info}</div>
            <div>{time}</div>
            <div>{location}</div>
            <div>{age}</div>
            <div>{leader}</div>
            <div>{teamPersonNum}</div>
            <div>{sex}</div>
            <div>
              {member.map((people) => {
                const { id, image: peopleImage, location: peopleLocation, sex: peopleSex, age: peopleAge } = people;
                return (
                  <>
                    <div>{id}</div>
                    <div>{peopleImage}</div>
                    <div>{peopleLocation}</div>
                    <div>{peopleSex}</div>
                    <div>{peopleAge}</div>
                  </>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}
