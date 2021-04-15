import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import styled from "styled-components";

import AboutUs from "./components/aboutUs/AboutUs";
import ConfessionsView from "./components/confessions/ConfessionsView";
import DailyMessage from "./components/dailyMessage/DailyMessage";
import Gallery from "./components/gallery/Gallery";
import NavBar from "./components/nav/NavBar";
import News from "./components/news/News";
import SideBarNews from "./components/news/sideBar/SideBarNews";
import ServicesView from "./components/services/ServicesView";
import StellaMaris from "./components/stellaMaris/StellaMaris";
import { ScrollBarStyled } from "./componentsReusable/ScrollBar";
import { RoutingPath } from "./models/Global";
import { mainTheme } from "./style/config";
import Home from "./components/home/Home";
import BackgroundImg from "./resources/images/old_stettin_roofs.png";
import Albums from "./components/albums/Albums";

const navHeight = "60px";

const GlobalStyle = styled.div`
  ${ScrollBarStyled}
  background-image: url(${BackgroundImg});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
`;

const MainContainerStyled = styled.div`
  position: relative;
  min-height: 100vh;
  /* 
padding-top: ${navHeight};
min-height: calc(100vh - ${navHeight});
*/
  background: rgba(0, 0, 0, 0.67);
  box-shadow: inset 0px 1412px 250px #6b624c;
`;

const GridColumnsStyled = styled.div`
  padding: 1.5px;
  box-sizing: border-box;
`;

const MainStyled = styled(GridColumnsStyled)`
  color: ${mainTheme.palette.secondary.dark};
  border-radius: 5px;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle>
        <NavBar />
        {/*-----------------------------*/}
        {/*DESKTOP VIEW*/}
        <MainContainerStyled>
          {/* MAIN */}
          <MainStyled>
            <Switch>
              <Route path={RoutingPath.service} component={ServicesView} />
              <Route
                path={RoutingPath.confessions}
                component={ConfessionsView}
              />
              <Route path={RoutingPath.gallery} component={Albums} />
              <Route path={RoutingPath.album} component={Gallery} />
              <Route path={RoutingPath.stellaMaris} component={StellaMaris} />
              <Route exact path={RoutingPath.news} component={News} />
              <Route exact path={RoutingPath.home} component={Home} />
            </Switch>
          </MainStyled>
        </MainContainerStyled>
        {/*-----------------------------*/}
      </GlobalStyle>
    </BrowserRouter>
  );
}

export default App;
