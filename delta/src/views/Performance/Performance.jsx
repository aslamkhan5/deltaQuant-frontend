import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { performance } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';

const Performance = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Performance', href: performance },
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Performance
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={performance}/>
    </Fragment>
  )
}

export default Performance