import React from "react";
import { Dropdown } from "react-bootstrap";
import { RiArrowDownSLine } from "react-icons/ri";
import { dummyProfile } from "../utils/images";
import { Link, useNavigate } from "react-router-dom";

const ProfileSwitcher = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="profile-dropdown d-flex flex-row gap-2 align-items-center">
      <div className="profilep-img">
        <img
          src={dummyProfile}
          alt=""
        />
      </div>
      <div className="owner-profile d-flex  flex-column gap-1">
        <h1 className="owner-name mb-0" style={{color: "white"}}>Test User</h1>
        <Dropdown className="settings-dropdown">
          <Dropdown.Toggle
            id="dropdown-basic"
            className="d-flex align-items-center gap-1"
          >
            Admin
            <RiArrowDownSLine className="arrow-down" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="profile-dropdown"> 
            <Link className="profile-item">
              <Dropdown.Item onClick={() => handleLogout()}>
                Logout
              </Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default ProfileSwitcher;
