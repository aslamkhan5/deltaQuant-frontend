import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import PositionPageTable from './PositionPageTable'
import { position } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';

const Position = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Position', href: position },
  ];
  function createData(bot, position, entry, exit, pl,id) {
    return { bot, position, entry, exit, pl,id };
  }
  
  const rows = [
    createData('Premium', 'Premium', 'Premium', '--','Premium',1),
    createData('Premium', 'Premium', 'Premium', '--','Premium',2),
    createData('Premium', 'Premium', 'Premium', '--','Premium',3),
    createData('Premium', 'Premium', 'Premium', '--','Premium',4),
    createData('Premium', 'Premium', 'Premium', '--','Premium',5),
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
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={position}/>
      <PositionPageTable rows={rows}/>
    </Fragment>
  )
}

export default Position