// MainRoute.js
import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { PublicRoutes } from "./public"
import { PrivateRoutes } from "./private"
import PrivateRoute from "./private/route"
import RoleState from "../context/currentRole"
import ErrorPage from "../components/ErrorPage"
import { AuthProvider } from "../context/authContext"

export default function MainRoute() {
  return (
    <AuthProvider>
      <Router>
        <RoleState>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {PublicRoutes?.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<item.component />}
              />
            ))}
            <Route element={<PrivateRoute />}>
              {PrivateRoutes?.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  element={<item.component />}
                />
              ))}
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </RoleState>
      </Router>
    </AuthProvider>
  )
}
