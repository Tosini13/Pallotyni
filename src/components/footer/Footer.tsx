import { fade, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { TitleTypography } from "../../style/MainStyled";
import BackgroundImg from "../../resources/images/old_stettin_roofs.png";

const FooterContainer = styled.div`
  background-image: url(${BackgroundImg});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 50vh;
  max-width: 100vw;
`;

const ImageCover = styled.div`
  padding: 20px 50px;
  background: linear-gradient(
    0deg,
    rgba(39, 53, 73, 0.97) 3.99%,
    rgba(39, 53, 73, 0.77) 37.94%,
    rgba(39, 53, 73, 0.94) 99.99%
  );
  min-height: 50vh;
`;

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <FooterContainer>
      <ImageCover>
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <TitleTypography>Footer</TitleTypography>
          </Grid>
          <Grid item>
            <Typography>Lorem</Typography>
          </Grid>
        </Grid>
      </ImageCover>
    </FooterContainer>
  );
};

export default Footer;
