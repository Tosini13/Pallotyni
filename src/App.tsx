import { Grid } from "@material-ui/core";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import styled from "styled-components";
import AboutUs from "./components/aboutUs/AboutUs";
import DailyMessage from "./components/dailyMessage/DailyMessage";
import NavBar from "./components/nav/NavBar";
import SideBarNews from "./components/news/SideBarNews";

const GridMainContainerStyled = styled(Grid)`
  position: relative;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
`;

const GridColumnsStyled = styled(Grid)`
  padding: 5px;
  border: black solid 1px;
`;

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        {/*-----------------------------*/}
        {/*DESKTOP VIEW*/}
        <GridMainContainerStyled container>
          {/* LEFT SIDEBAR*/}
          <GridColumnsStyled item md={3}>
            <Switch>
              <Route path="/" component={DailyMessage} />
            </Switch>
          </GridColumnsStyled>
          {/* MAIN */}
          <GridColumnsStyled item md={6}>
            <Switch>
              <Route path="/" component={AboutUs} />
            </Switch>
          </GridColumnsStyled>
          {/* RIGHT SIDEBAR*/}
          <GridColumnsStyled item md={3}>
            <Switch>
              <Route path="/" component={SideBarNews} />
            </Switch>
          </GridColumnsStyled>
        </GridMainContainerStyled>
        {/*-----------------------------*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
