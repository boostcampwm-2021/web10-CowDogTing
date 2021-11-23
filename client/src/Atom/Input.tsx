import styled from "@emotion/styled";

export const Input = styled.input`
  width: 300px;
  height: 50px;
  border: 2px solid #ffcfcf;
  padding: 0 20px;
  cursor: pointer;
  margin: 10px 3vw 20px 1vw;

  & + & {
    margin-top: 0px;
  }
  &:focus {
    outline: none;
  }
`;
