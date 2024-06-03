// Sidebar.js
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material'
import { styled } from '@mui/styles'
import { sidebarElements } from '../constants/SidebarElements'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../context/authContext'

const SidebarContainer = styled('div')(({ theme }) => ({
  width: '200px',
  backgroundColor: '#233228',
  // height: '100vh',
  padding: '20px 0',
  boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}))

const SidebarLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#ffffff',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '&.active': {
    color: '#57D57B',
  },
}))

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: '#ffffff',
  '&.active': {
    color: '#57D57B',
  },
}))

const CustomElement = styled('div')({
  width: '4px',
  height: '30px',
  borderRadius: '0px 10.67px 10.67px 0',
  backgroundColor: '#57D57B',
  position: 'absolute',
  left: 0,
})

const LogoutButton = styled(Button)(({ theme }) => ({
  margin: '20px',
  color: '#ffffff',
  backgroundColor: '#FF0000',
  '&:hover': {
    backgroundColor: '#FF4C4C',
  },
}))

const Sidebar = () => {
  const location = useLocation()
  const {logout} = useAuth()
  return (
    <SidebarContainer>
      <List>
        {sidebarElements.map((item, index) => {
          const isActive = location.pathname === `/${item.title.toLowerCase()}`
          return (
            <SidebarLink
              to={`/${item.title.toLowerCase()}`}
              key={index}
              className={isActive ? 'active' : ''}
            >
              {isActive && <CustomElement />}
              <ListItem button>
                <CustomListItemIcon className={isActive ? 'active' : ''}>
                  <item.icon />
                </CustomListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </SidebarLink>
          )
        })}
      </List>
      <LogoutButton
        startIcon={<LogoutIcon />}
        onClick={() => {
          // Add your logout logic here
          console.log('Logging out')
          logout()
          localStorage.clear()
        }}
      >
        Logout
      </LogoutButton>
    </SidebarContainer>
  )
}

export default Sidebar
