import { Grid } from "@mui/material";
import React, { useEffect } from "react";
const MainContent = () => {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Grid>
      <h1 color="white">hello world</h1>
    </Grid>
  );
};

export default MainContent;
