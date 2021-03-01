import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import styled from "styled-components";

import AboutUs from "./components/aboutUs/AboutUs";
import DailyMessage from "./components/dailyMessage/DailyMessage";
import Gallery from "./components/gallery/Gallery";
import NavBar from "./components/nav/NavBar";
import SideBarNews from "./components/news/SideBarNews";
import Services from "./components/services/Services";
import StellaMaris from "./components/stellaMaris/StellaMaris";
import { RoutingPath } from "./models/Global";

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
              <Route path={RoutingPath.home} component={DailyMessage} />
            </Switch>
          </LeftSidebarStyled>
          {/* MAIN */}
          <MainStyled>
            <Switch>
              <Route path={RoutingPath.service} component={Services} />
              <Route path={RoutingPath.gallery} component={Gallery} />
              <Route path={RoutingPath.stellaMaris} component={StellaMaris} />
              <Route exact path={RoutingPath.home} component={AboutUs} />
            </Switch>
          </MainStyled>
          {/* RIGHT SIDEBAR*/}
          <RightSidebarStyled>
            <Switch>
              <Route path={RoutingPath.home} component={SideBarNews} />
            </Switch>
          </RightSidebarStyled>
        </MainContainerStyled>
        {/*-----------------------------*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
