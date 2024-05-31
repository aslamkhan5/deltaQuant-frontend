// Layout.js
import React from 'react'
import { Outlet } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import Sidebar from '../components/Sidebar'

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
  },
  main: {
    flex: 1,
    padding: '20px',
  }
}))

const Layout = () => {
  const classes = useStyles()

  return (
    <div className={classes.layout}>
      <Sidebar />
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
