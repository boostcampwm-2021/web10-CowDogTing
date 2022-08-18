import styled from "@emotion/styled";

const searchIcon = "/Asset/search.png";
const SearchIconContainer = styled.img`
  position: relative;
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  cursor: pointer;
`;
export const SearchIcon = () => {
  return <SearchIconContainer alt="search Icon" src={searchIcon} />;
};
