import React, { useState, useEffect, Fragment } from "react";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    // <Sidebar>
    //   <MainContent />
    // </Sidebar>
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Dashboard
      </Typography>
    </Fragment>
  );
};

export default Dashboard;
