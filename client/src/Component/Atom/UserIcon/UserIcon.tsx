import styled from "@emotion/styled";

const userIcon = "/Asset/userIcon.svg";
export type UserIconProps = { onClick: () => void };

export const UserIcon = ({ onClick }: UserIconProps) => {
  return (
    <UserIconButton type="button" onClick={onClick}>
      <UserIconImage alt="user Icon" src={userIcon} />
    </UserIconButton>
  );
};

const UserIconImage = styled.img`
  position: relative;
  width: 48px;
  height: 48px;
  cursor: pointer;
`;

const UserIconButton = styled.button`
  background: none;
`;
