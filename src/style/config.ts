import { createMuiTheme } from "@material-ui/core/styles";

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#090807",
      light: "#423E3E", //#1f1616
      dark: "#262626",
    },
    secondary: {
      main: "rgba(192, 136, 26, 0.88)",
      light: "rgba(192, 136, 26)",
      dark: "rgba(192, 136, 26, 0.70)",
    },
    error: {
      main: "#D90E00",
      light: "#FF3B2E",
      dark: "#960A00",
    },
    success: {
      main: "#1D850D",
      light: "#18B500",
      dark: "#094200",
    },
    info: {
      main: "#4B58B8",
      light: "#576BFF",
      dark: "#07168A",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(192, 136, 26, 0.88)",
    },
  },
});

export const styledColors = {
  nav: {
    background: "rgba(0,0,0,0.5)",
  },
  icons: {
    tournament: "#7E6714",
    live: "#FF3B2E",
    my: "#7E6714",
    favorites: "#7E6714",
  },
  transparent: {
    main: "rgba(0,0,0,0)",
    light: "rgba(0,0,0,0.05)",
    dark: "rgba(255,255,255,0.05)",
  },
};
