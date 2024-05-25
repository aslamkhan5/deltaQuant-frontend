import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./public";
import { PrivateRoutes } from "./private";
import PrivateRoute from "./private/route";
import RoleState from "../context/currentRole";
import ErrorPage from "../components/ErrorPage";

export default function MainRoute() {
  return (
    <Router>
      <RoleState>
          <Routes>
            {PublicRoutes?.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<item.component />}
              />
            ))}
            {PrivateRoutes?.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={
                  <PrivateRoute component={item.component} route={item.path} />
                }
              />
            ))}

            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </RoleState>
    </Router>
  );
}
