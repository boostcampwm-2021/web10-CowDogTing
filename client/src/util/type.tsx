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
  sex: boolean;
  age: number;
};

export type TeamInfoType = {
  image: string;
  teamID: string;
  info: string;
  time: string;
  location: string;
  age: number;
  leader: boolean;
  teamPersonNum: number;
  sex: boolean;
  member: PersonInfoType[];
};
