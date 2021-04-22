import styled from "styled-components";
import { TextField, TextFieldProps } from "@material-ui/core";
import { mainTheme } from "../style/config";

export const inputStyle = `
  color: ${mainTheme.palette.text.primary};
  width: 100%;
  label {
    color: ${mainTheme.palette.text.primary};
  }
  .MuiInput-underline:before {
    border-color: rgba(255, 255, 255, 0.3);
  }
  .MuiIconButton-root {
    color: ${mainTheme.palette.text.primary};
  }
`;

export const TextFieldStyled = styled(TextField)`
  ${inputStyle}
`;

export const TextFieldC = (props: TextFieldProps) => {
  return <TextFieldStyled color="secondary" {...props} />;
};

export default TextFieldC;
