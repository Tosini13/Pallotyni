import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { NewStoreProvider } from "./stores/NewsStore";
import { mainTheme } from "./style/config";
import { PhotosStoreProvider } from "./stores/GalleryStore";
import { ServiceStoreProvider } from "./stores/ServiceStore";
import { ConfessionStoreProvider } from "./stores/ConfessionStore";
import { ParagraphStoreProvider } from "./stores/AboutUsStore";

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <StylesProvider injectFirst>
      <NewStoreProvider>
        <ServiceStoreProvider>
          <ConfessionStoreProvider>
            <PhotosStoreProvider>
              <ParagraphStoreProvider>
                <App />
              </ParagraphStoreProvider>
            </PhotosStoreProvider>
          </ConfessionStoreProvider>
        </ServiceStoreProvider>
      </NewStoreProvider>
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
