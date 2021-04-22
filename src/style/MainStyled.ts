import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "./config";

export const TitleTypography = styled(Typography)`
  margin: auto;
  width: fit-content;
  padding: 10px 20px;
  margin-bottom: 30px;
  border-bottom: ${mainTheme.palette.secondary.main} solid 1px;
  color: ${mainTheme.palette.text.primary};
  text-transform: uppercase;
`;

export const MainGridStyled = styled(Grid)`
  padding: 20px;
  margin-bottom: 50px;
  box-sizing: content-box;
`;

export const ImgStyled = styled.img<{ action?: string; hovered?: string }>`
  height: 150px;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    ${(props) =>
      props.action
        ? `filter: grayscale(1);`
        : `
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
    transform: translate(-3px, -3px);`}
  }
  ${(props) => (props.hovered ? `filter: grayscale(1);` : ``)}
`;
