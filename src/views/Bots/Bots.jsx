import { Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import BotTable from './BotTable'

const Bots = () => {
  function createData(bot, status, entry, exit) {
    return { bot, status, entry, exit };
  }
  
  const rows = [
    createData('Premium', 'Premium', 'Premium', '--'),
    createData('Premium', 'Premium', 'Premium', '--'),
    createData('Premium', 'Premium', 'Premium', '--'),
    createData('Premium', 'Premium', 'Premium', '--'),
    createData('Premium', 'Premium', 'Premium', '--'),
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 600, fontSize: 32 }}
      >
        Bot
      </Typography>
        <BotTable rows={rows}/>
    </Fragment>
  )
}

export default Bots