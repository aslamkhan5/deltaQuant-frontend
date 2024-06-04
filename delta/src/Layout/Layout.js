// Layout.js
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    flexShrink: 0,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '240px',
    flexShrink: 0,
    transition: 'transform 0.3s ease'
  },
  main: {
    flexGrow: 1,
    padding:20,
    overflow: 'auto',
  },
}));

const Layout = () => {
  const classes = useStyles()
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isSmOrBelow = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={classes.layout}>
      <Header toggleSidebar={toggleSidebar} className={classes.header} />
      <div className={classes.content}>
        {!isSmOrBelow && <Sidebar className={classes.sidebar} />}
        <main className={classes.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
