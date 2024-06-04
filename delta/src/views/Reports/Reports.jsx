import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { reports } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';

const Reports = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Reports', href: reports },
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Reports
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={reports}/>
    </Fragment>
  )
}

export default Reports