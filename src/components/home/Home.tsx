import MainLayout from "../layout/MainLayout";
import BackgroundImg from "../../resources/images/background_main.jpg";
import { Divider, Grid, GridSize } from "@material-ui/core";
import { TitleTypography, MainGridStyled } from "../../style/MainStyled";
import HomeServices from "./tales/HomeServices";
import HomeNews from "./tales/HomeNews";
import HomeConfessions from "./tales/HomeConfession";
import HomeAlbum from "./tales/HomeAlbum";

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
        <MainGridStyled
          item
          md={breakpoints.md}
          alignItems="center"
          style={{
            textAlign: "center",
          }}
        >
          <TitleTypography variant="h5">Najnowszy Album</TitleTypography>
          <HomeAlbum />
        </MainGridStyled>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography variant="h5">Msze Św.</TitleTypography>
          <HomeServices />
        </MainGridStyled>
      </Grid>
      <Divider style={{ margin: "20px 0px" }} />
      <Grid container justify="space-around">
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography variant="h5">Najnowsze Wydarzenia</TitleTypography>
          <HomeNews />
        </MainGridStyled>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <MainGridStyled item md={breakpoints.md}>
          <TitleTypography variant="h5">Spowiedź</TitleTypography>
          <HomeConfessions />
        </MainGridStyled>
      </Grid>
    </MainLayout>
  );
};

export default Home;
