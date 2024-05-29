import React, { useState } from "react"
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material"
import { RiArrowDownSLine } from "react-icons/ri"
import { dummyProfile } from "../utils/images"
import { Link, useNavigate } from "react-router-dom"

const ProfileSwitcher = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <Box className="profile-dropdown d-flex flex-row gap-2 align-items-center">
      <Avatar src={dummyProfile} alt="Profile" className="profilep-img" />
      <Box className="owner-profile d-flex flex-column gap-1">
        <Typography variant="h6" className="owner-name mb-0" sx={{ color: "white" }}>
          Test User
        </Typography>
        <Button
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          className="d-flex align-items-center gap-1"
          endIcon={<RiArrowDownSLine className="arrow-down" />}
        >
          Admin
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className="profile-dropdown"
        >
          <MenuItem onClick={handleLogout}>
            <Link to="/" className="profile-item">
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default ProfileSwitcher
