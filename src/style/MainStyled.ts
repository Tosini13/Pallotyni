import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "./config";

export const TitleTypography = styled(Typography)`
  margin: auto;
  width: fit-content;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-bottom: ${mainTheme.palette.secondary.main} solid 1px;
  color: ${mainTheme.palette.text.primary};
  text-transform: uppercase;
`;

export const MainGridStyled = styled(Grid)`
  background-color: #3b0202;
  padding: 20px;
  margin-bottom: 50px;
`;
