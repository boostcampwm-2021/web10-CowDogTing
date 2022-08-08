import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ButtonType } from "@Util/type";

const ButtonStyle = (props: ButtonType) => css`
  border: 2px solid ${props.color};
  ${props.type === "State" && StateButtonStyle}
  ${props.type === "Medium" && MediumButtonStyle}
  ${props.type === "Large" && LargeButtonStyle}
  ${props.type === "Long" && LongButtonStyle}
  ${props.type === "Long" &&
  css`
    background-color: ${props.color};
  `}
  ${props.type === "LargeDropDown" && LargeDropDownStyle}
  ${props.type === "SmallDropDown" && SmallDropDownStyle}
  &:hover {
    background-color: ${props.color};
    color: #ffffff;
  }
`;

export const Button = styled.div<ButtonType>`
  width: 125px;
  height: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    background-color: #ffcfcf;
    color: #ffffff;
  }
  ${ButtonStyle};
`;

Button.defaultProps = {
  type: "Small",
  color: "#ffcfcf",
};

/* 확인 , 취소 ... */
const StateButtonStyle = css`
  width: 100px;
  height: 50px;
`;

/* 선택 버튼 */
const MediumButtonStyle = css`
  width: 180px;
  height: 75px;
  border-radius: 0;
`;

/* 채팅 신청하기 */
const LargeButtonStyle = css`
  width: 250px;
  height: 80px;
`;

/* Oauth 로그인 버튼 */
const LongButtonStyle = css`
  width: 300px;
  color: #ffffff;

  &:hover {
    height: 60px;
  }
`;

const SmallDropDownStyle = css`
  width: 200px;
  height: 65px;
  border-radius: 0;
`;

const LargeDropDownStyle = css`
  width: 250px;
  height: 80px;
  border-radius: 0;
`;
