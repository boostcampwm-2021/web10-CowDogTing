import { css } from "@emotion/react";

const ContainerStyle = css`
  width: 50px;
  height: 50px;
  color: #ffffff;
  background-color: #ff0000;
  border-radius: 50%;
  border: 1px solid #ff0000;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -125px;
  left: 215px;
`;

export default function RoundNumberContainer({ num }: { num: number }) {
  return <div css={ContainerStyle}>{num}</div>;
}
