import styled from "styled-components";
import { TextField, TextFieldProps } from "@material-ui/core";
import { mainTheme } from "../style/config";

export const TextFieldStyled = styled(TextField)`
  color: ${mainTheme.palette.text.primary};
  width: 100%;
  label {
    color: ${mainTheme.palette.text.primary};
  }
`;

export const TextFieldC = (props: TextFieldProps) => {
  return <TextFieldStyled color="secondary" {...props} />;
};

export default TextFieldC;
