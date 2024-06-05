import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../helpers";
import { config } from "../configs";

export const RoleContext = createContext();

const RoleState = (props) => {
  const role = localStorage?.getItem("currentRole");
  const activeTab = localStorage.getItem("activeTab");
  const [currentRole, setCurrentRole] = useState(role ? role : "test");
  const [privateMessage, setPrivateMessage] = useState({});
  const [isColor, setIsColor] = useState(activeTab ? activeTab : "home");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  // useEffect(() => {
  //   const roleString = localStorage.getItem("userRole");
  //   const roles = JSON.parse(roleString) || [];
  //   setCurrentRole(
  //     roles?.includes("admin") ? "admin" : "test"
  //   );
  //   if (window.location.pathname === "/home") {
  //     localStorage?.setItem("activeTab", "home");
  //     setIsColor("home");
  //   }

  //   const params = new URLSearchParams(location.search);
  //   if (params && params.size > 0) {
  //     const googleToken = params.get("token");
  //     params.delete("token");
  //     const newSearch = params.toString();
  //     const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ""}`;
  //     navigate(newUrl);

  //     if (googleToken) {
  //       const decoded = parseJwt(googleToken);
  //       localStorage.setItem("token", googleToken);
  //       localStorage.setItem("isLoggedIn", true);
  //       if (decoded?.user?.role) {
  //         setCurrentRole(
  //           decoded?.user?.role?.includes("admin") ? "admin" : "test"
  //         );
  //       }
  //     }
  //     const token = localStorage.getItem("token");
  //     if (token || googleToken) {
  //       // const decodedAuthToken = jwtDecode(token || googleToken);
  //       // if (isTokenExpired(decodedAuthToken.exp)) {
  //       //   handleLogout();
  //       // }
  //     } else {
  //       handleLogout();
  //     }
  //   } else {
  //     if (token) {
  //       // const decodedAuthToken = jwtDecode(token);
  //       // if (isTokenExpired(decodedAuthToken.exp)) {
  //       //   handleLogout();
  //       // }
  //     } else {
  //       if (
  //         window.location.pathname !== "/signup" &&
  //         window.location.pathname !== "/reset-password" &&
  //         window.location.pathname !== "/send-email" &&
  //         window.location.pathname.includes("/verify-email") &&
  //         window.location.pathname.includes("/update-password")
  //       ) {
  //         handleLogout();
  //       }
  //     }
  //   }
  // }, []);


  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        isColor,
        setIsColor,
      }}
    >
      {props.children}
    </RoleContext.Provider>
  );
};
export default RoleState;
