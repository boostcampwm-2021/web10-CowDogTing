import { css } from "@emotion/react";
import { InfoImageContainer } from "@Hoc/.";
import { MyInfoContainer } from "@Organism/.";

const MyInfoStyle = css`
  padding-left: 50px;
  width: 60vw;
  display: flex;
  align-items: center;
`;

export const MyInfo = () => {
  return (
    <div css={MyInfoStyle}>
      <MyInfoContainer />
      <InfoImageContainer />
    </div>
  );
};
