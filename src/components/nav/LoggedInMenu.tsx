import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GridContainerStyled = styled(Grid)`
  padding: 10px;
`;

const LinkStyled = styled(Link)`
  color: black;
  font-size: 20px;
  text-decoration: none;
  &:hover {
    color: rgba(0, 0, 0, 0.4);
  }
`;

export interface LoggedInMenuProps {}

const LoggedInMenu: React.FC<LoggedInMenuProps> = () => {
  return (
    <GridContainerStyled container spacing={3} wrap="nowrap">
      <Grid item>
        <LinkStyled to="/news">News</LinkStyled>
      </Grid>
      <Grid item>
        <LinkStyled to="/news">Stella Maris</LinkStyled>
      </Grid>
      <Grid item>
        <LinkStyled to="/news">Service</LinkStyled>
      </Grid>
      <Grid item>
        <LinkStyled to="/news">Gallery</LinkStyled>
      </Grid>
      <Grid item>
        <LinkStyled to="/news">About</LinkStyled>
      </Grid>
    </GridContainerStyled>
  );
};

export default LoggedInMenu;
