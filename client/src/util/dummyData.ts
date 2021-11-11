/* eslint-disable no-console */

// import { ChatsInfoType, joinChatType, ProfileType, RequestsType, TeamInfoType } from "./type";
import { ChatsInfoType, joinChatType, ProfileType, RequestsType, TeamInfoType } from "./type";
import dummyImage from "../assets/meetingImage.png";
// import axios from "axios";

/**
 *
 * 유저 정보 구하기
 */
export function getUserInfo() {
  return {
    id: "yj",
    image: "Image",
    location: "우만동",
    sex: "male",
    age: 25,
    info: "안녕하세요",
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
export async function createTeam(teamID: string, image: string, info: string, location: string, userID: string) {
  // await axios.post(`localhost:3000`,{teamID,image,info,location,userID})

  console.log(teamID, info, image, location, userID);
}

/**
 * 팀 정보 구하기
 */
export async function getTeamPeople(gid: number): Promise<TeamInfoType> {
  //   const { data } = await axios.get(`localhost:3000?teamID=${gid}`);
  console.log(gid);
  const data = {
    image: "asfdadsf",
    id: "ajou",
    info: "asdfsafd",
    location: "우만동",
    age: 23,
    leader: "hansol",
    sex: "male",
    member: [
      {
        id: "yj",
        image: "Image",
        location: "우만동",
        age: 23,
        sex: "male",
        info: "안녕하세요",
      },
      {
        id: "hansory",
        image: "Image",
        location: "우만동",
        age: 23,
        sex: "male",
        info: "안녕하세요",
      },
    ],
  };
  return data;
}

/**
 * 소개 데이터 구하기
 */
export async function getCowDogInfo(person: number): Promise<ProfileType[]> {
  //   const { data } = await axios.get(`localhost:3000?person=${person}`);

  console.log(person);
  const data =
    person === 1
      ? [
          {
            id: "yj",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "hansory",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "yj",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "hansory",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "yj",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "hansory",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "yj",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "hansory",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "yj",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "hansory",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "yj",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "hansory",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "yj",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
          {
            id: "hansory",
            image: "Image",
            location: "우만동",
            sex: "female",
            age: 25,
            info: "안녕하세요",
          },
        ]
      : [
          {
            image: "1111",
            id: "111111",
            info: "asdfsafd",
            location: "우만동",
            age: 23,
            sex: "male",
            member: [
              {
                id: "yj",
                image: "Image",
                location: "우만동",
                age: 23,
                sex: "male",
                info: "안녕하세요",
              },
              {
                id: "hansory",
                image: "Image",
                location: "우만동",
                age: 23,
                sex: "male",
                info: "안녕하세요",
              },
            ],
          },
          {
            image: "asfdadsf",
            id: "팀명",
            info: "asdfsafd",
            location: "우만동",
            age: 23,
            sex: "male",
            member: [
              {
                id: "yj",
                image: "Image",
                location: "우만동",
                age: 23,
                sex: "male",
                info: "안녕하세요",
              },
              {
                id: "hansory",
                image: "Image",
                location: "우만동",
                age: 23,
                sex: "male",
                info: "안녕하세요",
              },
            ],
          },
        ];
  return data;
}

/**
 * 채팅 정보 구하기
 */
export async function getChatsInfo(): Promise<ChatsInfoType> {
  const data = {
    data: [
      {
        chatRoomID: 1,
        member: [
          {
            id: "영진",
            image: dummyImage,
            location: "우as만동",
            sex: "male",
            age: 25,
            info: "gggg",
          },
          {
            id: "222",
            image: dummyImage,
            location: "우fasd만동",
            sex: "male",
            age: 25,
            info: "fffff",
          },
          {
            id: "123",
            image: dummyImage,
            location: "asdf우만동",
            sex: "male",
            age: 25,
            info: "afsd",
          },
        ],
        chatMessage: [
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "yj",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅎㅇㅎddddddddddddㅎㅇㅎddddddddddddㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "yj",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "yj",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "영진",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
        ],
      },
      {
        chatRoomID: 2,
        member: [
          {
            id: "3영진3",
            image: dummyImage,
            location: "우as만동",
            sex: "male",
            age: 25,
            info: "gggg",
          },
          {
            id: "222",
            image: dummyImage,
            location: "우fasd만동",
            sex: "male",
            age: 25,
            info: "fffff",
          },
          {
            id: "123",
            image: dummyImage,
            location: "asdf우만동",
            sex: "male",
            age: 25,
            info: "afsd",
          },
        ],
        chatMessage: [
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅎㅇㅎㅇ",
            read: true,
            source: "image",
          },
          {
            from: "123",
            message: "ㅂㅇㅂㅇ",
            read: true,
            source: "image",
          },
        ],
      },
    ],
  };
  return data;
}

/**
 * 요청 정보 구하기
 */

export async function getRequestInfo(): Promise<RequestsType> {
  const data = {
    data: [
      {
        from: "123",
        to: "yj",
        info: {
          id: "yj",
          image: "Image",
          location: "우만동",
          sex: "female",
          age: 25,
          info: "안녕하세요",
        },
        state: "대기중",
      },
      {
        from: "yj",
        to: "123",
        info: {
          id: "123",
          image: "Image",
          location: "우만동",
          sex: "female",
          age: 26,
          info: "안녕하세요",
          member: [],
        },
        state: "대기중",
      },
    ],
  };
  return data;
}

/**
 * 참여한 채팅방 정보
 */
export async function getJoinChatInfo(): Promise<joinChatType[]> {
  const data = [
    {
      chatRoomID: 1,
      notReadNum: 3,
    },
    {
      chatRoomID: 2,
      notReadNum: 4,
    },
    {
      chatRoomID: 3,
      notReadNum: 5,
    },
  ];
  return data;
}

export function getGameDatas() {
  const data = ["캐치마인드"];
  return data;
}

export function getGatherCharacter() {
  const data = ["1", "2", "3", "4", "5"];
  return data;
}
