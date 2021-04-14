import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../../style/config";
import { TitleTypography } from "../../style/MainStyled";

const FooterContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px 50px;
`;

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <FooterContainer>
      <TitleTypography>Footer Kontakt</TitleTypography>
      <Typography>Lorem</Typography>
    </FooterContainer>
  );
};

export default Footer;
