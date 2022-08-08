import styled from "@emotion/styled";
import { css } from "@emotion/react";

const LargeModalStyle = css`
  width: 550px;
  height: 400px;
  top: 30%;
  left: 40%;
`;

const SmallModalStyle = css`
  width: 450px;
  height: 300px;
  top: 35%;
  left: 43%;
`;

const typeStyle = (props: { type: string }) => css`
  ${props.type === "Large" && LargeModalStyle}
  ${props.type === "Small" && SmallModalStyle}
`;

export const Modal = styled.div`
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  ${typeStyle}
`;
