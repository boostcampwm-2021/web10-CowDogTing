import { menuListType } from "./type";

export const MENU_LIST: menuListType = {
  Location: [{ name: "서울" }, { name: "경기" }, { name: "인천" }, { name: "대구" }, { name: "대전" }, { name: "광주" }, { name: "부산" }, { name: "울산" }],
  Age: [{ name: "10대" }, { name: "20대" }, { name: "30대" }],
  Sex: [{ name: "남자" }, { name: "여자" }],
  Chat: [
    { link: "/sub/chatList", name: "내 채팅 목록 보기" },
    { link: "/sub/Request", name: "채팅 요청 목록" },
  ],
  Menu: [{ link: "/", name: "공지사항" }, { link: "/sub/CowDogPage?person=1", name: "소개팅 하러가기" }, { name: "미팅 하러가기" }, { link: "/", name: "이벤트" }, { link: "/", name: "문의하기" }],
  Meeting: [
    { link: "/sub/CowDogPage?person=2", name: "2:2 미팅" },
    { link: "/sub/CowDogPage?person=3", name: "3:3 미팅" },
    { link: "/sub/CowDogPage?person=4", name: "4:4 미팅" },
  ],
  User: [
    { link: "/sub/mypage/myinfo", name: "내 정보 보기" },
    { link: "/sub/mypage/likelist", name: "내가 고른 이상형" },
    { link: "/sub/teamSetting", name: "팀 설정하기" },
    { link: "", name: "로그아웃" },
  ],
};

export const gameDatas = [
  { title: "라이어게임 Web17", src: "https://liarking.kro.kr", color: "#000000" },
  { title: "부트리스 Web24", src: "https://boostris.com/login", color: "#154089" },
  { title: "부덕사운드 Web2", src: "https://booducksound.kro.kr", color: "#c3e3f0" },
];
export function getGameDatas(index: number) {
  return gameDatas[index];
}
