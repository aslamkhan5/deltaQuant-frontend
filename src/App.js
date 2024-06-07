import React from "react";
import MainRoute from "./routes";
import { ToastContainer } from "react-toastify";
import './assets/styles/generic-styling.css';
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/theme";
import {CssBaseline}  from "@mui/material";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <MainRoute />
    </ThemeProvider>
  );
};

export default App;
