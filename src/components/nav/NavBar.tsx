import React from "react";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import LoggedInMenu from "./LoggedInMenu";
import Logo from "../../resources/logo/pallotyni_logo.png";
import { Grid } from "@material-ui/core";
import Language from "./Language";

const Divider = styled.div`
  height: 60px;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.7);
  margin: 0px 20px;
`;

const LogoStyled = styled.img`
  height: 60px;
`;

const NavContainer = styled.div`
  width: 100vw;
  top: 0px;
  left: 0px;
  z-index: 1100;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  background-color: ${mainTheme.palette.primary.main};
  padding: 5px 20px;
`;

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <NavContainer>
      <Grid container alignItems="center">
        <Grid item>
          <LogoStyled src={Logo} alt="logo" />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <LoggedInMenu />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <Language />
        </Grid>
      </Grid>
    </NavContainer>
  );
};

export default NavBar;
