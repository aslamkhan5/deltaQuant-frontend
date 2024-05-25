import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Sidebar>
      <MainContent />
    </Sidebar>
  );
};

export default Home;
