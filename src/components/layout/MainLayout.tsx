import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import Footer from "../footer/Footer";

const mainHeightOnImg = "150px";

const ImgBackground = styled.div<{ src: string }>`
  min-height: 100vh;
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const TitleContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50% - ${mainHeightOnImg} / 2));
  padding: 60px 40px 70px 40px;
  background-color: rgba(0, 0, 0, 0.58);
`;

const SubTitleContainer = styled.div`
  position: absolute;
  left: 0%;
  bottom: 0%;
  padding: 3px 25px;
  background-color: ${mainTheme.palette.secondary.main};
`;

const MainContainer = styled.div`
  margin: auto;
  margin-top: -${mainHeightOnImg};
  padding: 20px;
  max-width: 980px;
  min-height: 100vh;
  position: relative;
`;

export interface MainLayoutProps {
  img: string;
  title: string;
  subtitle?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  img,
  title,
  children,
  subtitle,
}) => {
  return (
    <>
      <ImgBackground src={img}>
        <TitleContainer>
          <Typography variant="h2" color="textPrimary">
            {title}
          </Typography>
          {subtitle ? (
            <SubTitleContainer>
              <Typography variant="h5" color="textPrimary">
                {subtitle}
              </Typography>
            </SubTitleContainer>
          ) : null}
        </TitleContainer>
      </ImgBackground>
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
};

export default MainLayout;
