/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ProfileCardType } from "../../Util/type";

const typeStyle = (props: { type: string }) => css`
  border: 5px solid ${(props.type === "team" && "#CAABFB") || (props.type === "male" && "#CFDAFF") || (props.type === "female" && "#FFCFCF")};
`;

const ProfileCardContainer = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 10px;
  cursor: pointer;
  padding: 20px 40px;
  margin: 2vh auto;
  display: flex;
  background-color: #ffffff;
  ${typeStyle}
`;

export default function ProfileCard({ type, children }: ProfileCardType) {
  return <ProfileCardContainer type={type}>{children}</ProfileCardContainer>;
}
