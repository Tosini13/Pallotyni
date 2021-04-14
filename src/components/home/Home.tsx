import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/background_main.jpg";
import { Grid, GridSize } from "@material-ui/core";
import styled from "styled-components";
import { TitleTypography, MainGridStyled } from "../../style/MainStyled";
import Image from "../../resources/images/church_cross.png";
import HomeServices from "./HomeServices";
import HomeNews from "./HomeNews";
import HomeConfessions from "./HomeConfession";

const Img = styled.img`
  width: 300px;
`;

const ImgContainer = styled.div`
  padding: 15px;
  background-color: black;
  width: fit-content;
  margin: auto;
`;

const breakpoints = {
  md: 5 as GridSize,
  xs: 12 as GridSize,
};

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <MainLayout
      img={BackgroundImg}
      title="Parafia p.w. św. Jana Ewangelisty w Szczecinie"
      subtitle="Kościół Pallotynów"
    >
      <Grid container justify="space-around">
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Najnowsze Albumy</TitleTypography>
          <ImgContainer>
            <Img src={Image} alt="albums" />
          </ImgContainer>
        </MainGridStyled>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Msze św.</TitleTypography>
          <HomeServices />
        </MainGridStyled>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Najnowsze Wydarzenia</TitleTypography>
          <HomeNews />
        </MainGridStyled>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography>Spowiedź</TitleTypography>
          <HomeConfessions />
        </MainGridStyled>
      </Grid>
    </MainLayout>
  );
};

export default Home;
