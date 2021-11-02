/* eslint-disable no-console */
/* eslint-disable comma-dangle */

import { PersonInfoType, TeamInfoType } from "./type";

// import axios from "axios";

export function getUserInfo() {
  return {
    user: {
      id: "yj",
      image: "Image",
      location: "우만동",
      sex: true,
      age: 25,
      teamID: null,
      joinChatRooms: [
        {
          roomID: 1,
          notRead: 5,
        },
        {
          roomID: 2,
          notRead: 0,
        },
      ],
    },
  };
}

export function checkIdOverlap(id: string): boolean {
  return id === "yj";
}

export async function registerUser(id: string, pw: string, location: string, sex: string, age: number): Promise<boolean> {
  //   const { data } = await axios.post(`localhost:3000`, { id, pw, location, sex, age });

  //   return !!data;
  console.log(id, pw, location, sex, age);
  return true;
}
export async function createTeam(teamID: string, image: string, info: string, time: string, location: string, userID: string) {
  // await axios.post(`localhost:3000`,{teamID,image,info,time,location,userID})

  console.log(teamID, info, image, time, location, userID);
}
export async function getTeamPeople(teamID: string): Promise<TeamInfoType> {
  //   const { data } = await axios.get(`localhost:3000?teamID=${teamID}`);
  console.log(teamID);
  const data = {
    image: "asfdadsf",
    teamID: "팀명",
    info: "asdfsafd",
    time: "월, 금 오후 3시",
    location: "우만동",
    age: 23,
    leader: false,
    teamPersonNum: 2,
    sex: false,
    member: [
      {
        id: "yj",
        image: "Image",
        location: "우만동",
        age: 23,
        sex: true,
      },
      {
        id: "hansory",
        image: "Image",
        location: "우만동",
        age: 23,
        sex: true,
      },
    ],
  };
  return data;
}

export async function getCowDogPersonInfo(): Promise<PersonInfoType[]> {
  //   const { data } = await axios.get(`localhost:3000`);

  const data = [
    {
      id: "yj",
      image: "Image",
      location: "우만동",
      sex: true,
      age: 25,
    },
    {
      id: "hansory",
      image: "Image",
      location: "우만동",
      sex: true,
      age: 25,
    },
  ];

  return data;
}
export async function getCowDogTeamInfo(person: number): Promise<TeamInfoType[]> {
  //   const { data } = await axios.get(`localhost:3000?person=${person}`);

  console.log(person);
  const data = [
    {
      image: "asfdadsf",
      teamID: "팀명",
      info: "asdfsafd",
      time: "월, 금 오후 3시",
      location: "우만동",
      age: 23,
      leader: false,
      teamPersonNum: 2,
      sex: false,
      member: [
        {
          id: "yj",
          image: "Image",
          location: "우만동",
          age: 23,
          sex: true,
        },
        {
          id: "hansory",
          image: "Image",
          location: "우만동",
          age: 23,
          sex: true,
        },
      ],
    },
    {
      image: "asfdadsf",
      teamID: "팀명",
      info: "asdfsafd",
      time: "월, 금 오후 3시",
      location: "우만동",
      age: 23,
      leader: false,
      teamPersonNum: 2,
      sex: false,
      member: [
        {
          id: "yj",
          image: "Image",
          location: "우만동",
          age: 23,
          sex: true,
        },
        {
          id: "hansory",
          image: "Image",
          location: "우만동",
          age: 23,
          sex: true,
        },
      ],
    },
  ];
  return data;
}
