// PrivateRoute.js
import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import Layout from "../../Layout/Layout"

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  )
}

export default PrivateRoute
