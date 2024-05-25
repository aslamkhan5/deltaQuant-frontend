import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
const MainContent = () => {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container fluid className="main-content dashboard-main">
      <h1>hello world</h1>
    </Container>
  );
};

export default MainContent;
