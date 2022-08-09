import React from "react";
import { css } from "@emotion/react";

const InfoStyle = css`
  width: 300px;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-around;
  border: 2px solid #ffcfcf;
  margin-bottom: 20px;
  text-align: center;
  margin-left: 7px;
`;

export type LocationDropDownProps = { locSelected: string; handleLocationSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void; id: string };
export const LocationDropDown = ({ locSelected, handleLocationSelected, id }: LocationDropDownProps) => {
  return (
    <select css={InfoStyle} onChange={handleLocationSelected} value={locSelected}>
      <option selected value={id} disabled>
        거주지를 선택해주세요.
      </option>
      {locationList.map(({ id, value }) => (
        <option key={id} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

const locationList = [
  { id: "서울", value: "서울" },
  { id: "경기", value: "경기" },
  { id: "인천", value: "인천" },
  { id: "대구", value: "대구" },
  { id: "대전", value: "대전" },
  { id: "광주", value: "광주" },
  { id: "부산", value: "부산" },
  { id: "울산", value: "울산" },
];
