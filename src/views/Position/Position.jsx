import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import PositionPageTable from './PositionPageTable'

const Position = () => {
  function createData(bot, position, entry, exit, pl) {
    return { bot, position, entry, exit, pl };
  }
  
  const rows = [
    createData('Premium', 'Premium', 'Premium', '--','Premium'),
    createData('Premium', 'Premium', 'Premium', '--','Premium'),
    createData('Premium', 'Premium', 'Premium', '--','Premium'),
    createData('Premium', 'Premium', 'Premium', '--','Premium'),
    createData('Premium', 'Premium', 'Premium', '--','Premium'),
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 600, fontSize: 32 }}
      >
        Position
      </Typography>
      <PositionPageTable rows={rows}/>
    </Fragment>
  )
}

export default Position