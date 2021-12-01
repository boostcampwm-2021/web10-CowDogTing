import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { profileModalDatas, teamState, userState } from "../src/Recoil/Atom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

function Test({ profileDatas, teamDatas, userDatas, children }) {
  const setProfileModal = useSetRecoilState(profileModalDatas);
  const setTeamState = useSetRecoilState(teamState);
  const setUserState = useSetRecoilState(userState);

  setProfileModal(profileDatas);
  setTeamState(teamDatas);
  setUserState(userDatas);

  return <div>{children}</div>;
}

export const decorators = [
  (Story, context) => (
    <RecoilRoot>
      <BrowserRouter>
        <Test {...dummyData}>
          <Story {...context} />
        </Test>
      </BrowserRouter>
    </RecoilRoot>
  ),
];

const dummyData = {
  profileDatas: [
    {
      id: "1",
      image: null,
      location: "서울",
      sex: "남자",
      age: 25,
      info: "hihi",
      gid: null,
      idx: 1,
    },
  ],
  teamDatas: {
    id: "",
    image: null,
    location: "",
    sex: "",
    age: 0,
    info: "",
    leader: "",
    member: [],
  },
  userDatas: {
    id: "",
    image: null,
    location: "",
    sex: "",
    age: 0,
    info: "",
    gid: null,
    idx: 0,
  },
};
