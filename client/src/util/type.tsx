export type ButtonType = {
  type?: string;
  color?: string;
};

export type ImageDivType = {
  type: string;
  image: string;
};

export type ChildrenType = {
  children?: JSX.Element;
};

export type PersonInfoType = {
  id: string;
  image: string;
  location: string;
  sex: string;
  age: number;
  info: string;
};

export type TeamInfoType = {
  image: string;
  teamID: string;
  info: string;
  time: string;
  location: string;
  age: number;
  sex: string;
  member: PersonInfoType[];
};

export type ProfileType = {
  id: string;
  image: string;
  location: string;
  sex: string;
  age: number;
  info: string;
  member?: PersonInfoType[];
};

export type ProfileInfoDataType = {
  data: ProfileType;
};

export type CowDogPageBodyType = {
  datas: ProfileType[] | null;
  person: number;
  setOpenModal: (prev: any) => void;
};
