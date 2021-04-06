import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RoutingPath } from "../../models/Global";

const GridContainerStyled = styled(Grid)`
  padding: 10px;
  & > div:hover {
    & > div {
      opacity: 1;
    }
  }
`;

const LinkStyled = styled(Link)`
  color: black;
  font-size: 20px;
  text-decoration: none;
  &:hover {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const TypographyStyled = styled(Typography)`
  cursor: pointer;
  color: black;
  font-size: 20px;
  text-decoration: none;
  &:hover {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const GridSubMenuContainerStyled = styled(Grid)`
  transition: 0.2s all;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  padding: 10px;
  width: fit-content;
  opacity: 0;
`;
export interface GridSubMenuItemProps {}
const GridSubMenuItem: React.FC<GridSubMenuItemProps> = ({ children }) => (
  <Grid item>{children}</Grid>
);

export interface GridSubMenuContainerProps {}
const GridSubMenuContainer: React.FC<GridSubMenuContainerProps> = ({
  children,
}) => (
  <GridSubMenuContainerStyled container direction="column" spacing={1}>
    {children}
  </GridSubMenuContainerStyled>
);

const GridMenuItemStyled = styled(Grid)`
  position: relative;
`;
export interface GridMenuItemProps {}
const GridMenuItem: React.FC<GridMenuItemProps> = ({ children }) => (
  <GridMenuItemStyled item>{children}</GridMenuItemStyled>
);

export interface LoggedInMenuProps {}

const LoggedInMenu: React.FC<LoggedInMenuProps> = () => {
  return (
    <GridContainerStyled container spacing={3} wrap="nowrap">
      <GridMenuItem>
        <LinkStyled to={RoutingPath.home}>Home</LinkStyled>
      </GridMenuItem>
      <GridMenuItem>
        <TypographyStyled>Service</TypographyStyled>
        <GridSubMenuContainer>
          <GridSubMenuItem>
            <LinkStyled to={RoutingPath.service}>Service</LinkStyled>
          </GridSubMenuItem>
          <GridSubMenuItem>
            <LinkStyled to={RoutingPath.confessions}>Confession</LinkStyled>
          </GridSubMenuItem>
        </GridSubMenuContainer>
      </GridMenuItem>
      <GridMenuItem>
        <LinkStyled to={RoutingPath.gallery}>Gallery</LinkStyled>
      </GridMenuItem>
      <GridMenuItem>
        <LinkStyled to={RoutingPath.news}>News</LinkStyled>
      </GridMenuItem>
    </GridContainerStyled>
  );
};

export default LoggedInMenu;
