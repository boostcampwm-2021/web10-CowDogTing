import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ButtonType } from "../util/type";

/* 나가기 버튼 */
const SmallButtonStyle = css`
  height: 50px;
`;

/* 선택 버튼 */
const MediumButtonStyle = css`
  width: 180px;
  height: 75px;
`;

/* 채팅 신청하기 */
const LargeButtonStyle = css`
  width: 250px;
  height: 80px;
`;

const LongButtonStyle = css`
  width: 300px;
`;

const SmallDropDownStyle = css`
  width: 200px;
  height: 65px;
`;

const LargeDropDownStyle = css`
  width: 250px;
  height: 80px;
`;

const ButtonStyle = (props: ButtonType) => css`
  ${props.type === "Small" && SmallButtonStyle}
  ${props.type === "Medium" && MediumButtonStyle}
  ${props.type === "Large" && LargeButtonStyle}
  ${props.type === "Long" && LongButtonStyle}
  ${props.type === "LargeDropDown" && LargeDropDownStyle}
  ${props.type === "SmallDropDown" && SmallDropDownStyle}
`;

export const Button = styled.div`
  width: 125px;
  height: 50px;
  border: 2px solid #ffcfcf;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  &:hover {
    background-color: #ffcfcf;
    color: #ffffff;
  }
  ${ButtonStyle};
`;

Button.defaultProps = {
  // eslint-disable-next-line comma-dangle
  color: "basic",
};
