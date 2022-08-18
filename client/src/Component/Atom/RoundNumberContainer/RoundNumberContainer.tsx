import styled from "@emotion/styled";

const Container = styled.div`
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

export type RoundNumberType = { num: number };
export const RoundNumberContainer = ({ num }: RoundNumberType) => {
  return <Container>{num}</Container>;
};
