export type ButtonType = {
  type?: string;
  color?: string;
};

export type ImageDivType = {
  type: string;
  image: string;
};

export type ChildrenType = {
  children?: JSX.Element | JSX.Element[];
};

export type InputLabelType = {
  label: string;
  placeholder?: string;
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
  idx?: number;
};

export type ProfileListType = {
  datas: ProfileType[] | null;
  person: number;
  setOpenModal: (prev: any) => void;
};

export type LargeModalType = {
  children: JSX.Element[];
  datas: ProfileType[] | null;
  decreaseIndex: (e: React.MouseEvent<HTMLElement>) => void;
  inCreaseIndex: (e: React.MouseEvent<HTMLElement>) => void;
  index: number;
};

export type SmallModalType = {
  data: ProfileType;
  setRequest: (current: boolean) => void;
};
