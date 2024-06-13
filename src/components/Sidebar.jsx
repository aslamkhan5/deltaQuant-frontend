// Sidebar.js
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material'
import { styled } from '@mui/styles'
import { sidebarElements } from '../constants/SidebarElements'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../context/authContext'
import UserProfile from './UserProfile'
import { login } from '../routes/pathName'

const SidebarContainer = styled('div')(({ theme }) => ({
  width: '300px',
  // backgroundColor: '#233228',
  backgroundColor: '#202020',

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
    background:"#233228"
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


const Sidebar = () => {
  const formatTitleToUrl = (title) => title.toLowerCase().replace(/\s+/g, '-');
  const location = useLocation()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <SidebarContainer>
      <List className='scrollContainer' style={{overflow:"auto"}}>
        <UserProfile />
        {sidebarElements.map((item, index) => {
          const isActive = location.pathname === `/${formatTitleToUrl(item.title)}`
          return (
            <SidebarLink
              to={`/${formatTitleToUrl(item.title)}`}
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
      
      <SidebarLink
        onClick={handleLogout}
      >
        <ListItem button>
          <CustomListItemIcon>
            <LogoutIcon />
          </CustomListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </SidebarLink>
    </SidebarContainer>
  )
}

export default Sidebar
