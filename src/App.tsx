import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import styled from "styled-components";

import AboutUs from "./components/aboutUs/AboutUs";
import DailyMessage from "./components/dailyMessage/DailyMessage";
import NavBar from "./components/nav/NavBar";
import SideBarNews from "./components/news/SideBarNews";

const navHeight = "60px";

const MainContainerStyled = styled.div`
  position: relative;
  margin-top: ${navHeight};
  min-height: calc(100vh - ${navHeight});
`;

const GridColumnsStyled = styled.div`
  padding: 5px;
`;

const MainStyled = styled(GridColumnsStyled)`
  margin: 0px auto;
  width: 50vw;
`;

const SidebarStyled = styled(GridColumnsStyled)`
  position: fixed;
  margin-top: ${navHeight};
  width: 23vw;
  top: 0px;
`;

const LeftSidebarStyled = styled(SidebarStyled)`
  left: 0px;
`;

const RightSidebarStyled = styled(SidebarStyled)`
  right: 0px;
`;

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        {/*-----------------------------*/}
        {/*DESKTOP VIEW*/}
        <MainContainerStyled>
          {/* LEFT SIDEBAR*/}
          <LeftSidebarStyled>
            <Switch>
              <Route path="/" component={DailyMessage} />
            </Switch>
          </LeftSidebarStyled>
          {/* MAIN */}
          <MainStyled>
            <Switch>
              <Route path="/" component={AboutUs} />
            </Switch>
          </MainStyled>
          {/* RIGHT SIDEBAR*/}
          <RightSidebarStyled>
            <Switch>
              <Route path="/" component={SideBarNews} />
            </Switch>
          </RightSidebarStyled>
        </MainContainerStyled>
        {/*-----------------------------*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
