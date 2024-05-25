import React from "react";
import MainRoute from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <MainRoute />
    </div>
  );
};

export default App;
