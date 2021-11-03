/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ProfileImageType } from "../util/type";

const bigProfileImageStyle = css`
  width: 300px;
  height: 300px;
  border-radius: 150px;
`;
const smallProfileImageStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const profileImageStyle = (props: ProfileImageType) => css`
  ${props.type === "Big" && bigProfileImageStyle}
  ${props.type === "Small" && smallProfileImageStyle}
  background-image: url(${props.image as string});
  background-size: cover;
`;

export const ProfileImage = styled.div`
  ${profileImageStyle}
`;
