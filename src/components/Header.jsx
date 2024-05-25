import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router";
import { RiMenu3Fill } from "react-icons/ri";
import ProfileSwitcher from "./ProfileSwitcher";
import PostModal from "./postModal";

const Header = ({ toggleSidebar }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const location = useLocation();
  return (
    <Container
      fluid
      className=" header d-flex flex-row align-items-center justify-content-between "
      style={{background: "black"}}
    >
      <div className="menu-header d-flex align-items-center gap-3 flex-row">
        {[
          "/dashboard"
        ].includes(location.pathname) && (
            <div className="menu-opener" onClick={toggleSidebar}>
              <RiMenu3Fill className="opener" />
            </div>
          )}
        {/* <AngelLogo className="logo" type="home" /> */}
      </div>
      <div className="search-profile d-flex align-items-center gap-4">

        <PostModal show={showPostModal} onClose={() => setShowPostModal(false)} />
        <ProfileSwitcher />
      </div>
    </Container>
  );
};

export default Header;