import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./font.css";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7795f2",
    },
    secondary: {
      main: "#F2E8CF",
    },
  },
  typography: {
    h6: { fontFamily: "'Comfortaa', cursive" },
    subtitle1: { fontFamily: "'Comfortaa', cursive" },
    button: {
      textTransform: "none",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
