import React from "react";
import styled from "styled-components";
import { styledColors } from "../../style/config";
import LoggedInMenu from "./LoggedInMenu";

const NavContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0px;
  left: 0px;
  z-index: 1100;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  background-color: ${styledColors.nav.background};
`;

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <NavContainer>
      <LoggedInMenu />
    </NavContainer>
  );
};

export default NavBar;
