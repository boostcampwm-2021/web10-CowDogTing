/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const typeStyle = (props: { type: string }) => css`
  border: 5px solid ${(props.type === "team" && "#CAABFB") || (props.type === "male" && "#CFDAFF") || (props.type === "female" && "#FFCFCF")};
`;

const ProfileCardContainer = styled.div`
  width: 400px;
  height: 200px;
  ${typeStyle}
  border-radius : 10px;
  cursor: pointer;
  padding: 20px 40px;
`;

export default function ProfileCard({ type, children }: { type: string; children: JSX.Element[] | JSX.Element }) {
  return <ProfileCardContainer type={type}>{children}</ProfileCardContainer>;
}
