import React, { useContext, useEffect, useState } from "react";
import { TbHome2, TbBadge } from "react-icons/tb";
import { CgFeed } from "react-icons/cg";
import { PiUsersThreeLight } from "react-icons/pi";
import { TiWorldOutline } from "react-icons/ti";
import { RiSettings4Line } from "react-icons/ri";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Header from "./Header";
import { RoleContext } from "../context/currentRole";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ children }) => {
  const { setCurrentRole, isColor, setIsColor } = useContext(RoleContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const handleTabActive = (tab) => {
    localStorage.setItem("activeTab", tab);
    setIsColor(tab);
  };

  useEffect(() => {
    const activeTab = localStorage.getItem("activeTab");
    setIsColor(
      window.location.pathname === "/dashboard"
        ? "home"
        : activeTab
        ? activeTab
        : "home"
    );
    const userRole = JSON.parse(localStorage.getItem("userRole")) || [];
    const role = localStorage?.getItem("currentRole");
    setCurrentRole(role);
    localStorage.setItem("currentRole", role);
  }, []);

  return (
    <div className="dashboard">
      <span
        className={`overlay-styled ${isSidebarOpen ? "is-active" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></span>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="main-dashboard">
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="cross-icon " onClick={toggleSidebar}>
            <RxCross2 className="opener" />
          </div>
          <Link to="/dashboard">
            <div
              id="home"
              onClick={() => handleTabActive("home")}
              className={
                isColor === "home" ? "sidebar-item active" : "sidebar-item"
              }
            >
              <TbHome2 className="sidebar-icon" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link to="/bots">
            <div
              key="feed"
              onClick={() => {
                handleTabActive("feed");
              }}
              className={
                isColor === "feed" ? "sidebar-item active" : "sidebar-item"
              }
            >
              <CgFeed className="sidebar-icon" />
              <span>Bots</span>
            </div>
          </Link>
          <Link to="/position">
            <div
              key="investors"
              onClick={() => {
                handleTabActive("investors");
              }}
              className={
                isColor === "investors" ? "sidebar-item active" : "sidebar-item"
              }
            >
              <PiUsersThreeLight className="sidebar-icon" />
              <span>Position</span>
            </div>
          </Link>
          <Link to="/orders">
            <div
              key="startups"
              onClick={() => {
                handleTabActive("startups");
              }}
              className={
                isColor === "startups" ? "sidebar-item active" : "sidebar-item"
              }
            >
              <TbBadge className="sidebar-icon" />
              <span>Orders</span>
            </div>
          </Link>
          <Link to="/performance">
            <div
              key="followers"
              onClick={() => {
                handleTabActive("followers");
              }}
              className={
                isColor === "followers" ? "sidebar-item active" : "sidebar-item"
              }
            >
              <TiWorldOutline className="sidebar-icon" />
              <span>Performance</span>
            </div>
          </Link>

          <Link to="/inbox">
            <div
              key="chat"
              onClick={() => {
                handleTabActive("chat");
              }}
              className={
                isColor === "chat" ? "sidebar-item active" : "sidebar-item"
              }
            >
              <HiOutlineChatBubbleLeft className="sidebar-icon" />
              <span>Inbox</span>
            </div>
          </Link>
          <Link to="/reports">
            <div
              key="user-settings"
              onClick={() => {
                handleTabActive("user-settings");
              }}
              className={
                isColor === "user-settings"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
            >
              <RiSettings4Line className="sidebar-icon" />
              <span>Reports</span>
            </div>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
