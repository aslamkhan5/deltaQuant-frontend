import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';
import { backtests } from '../../routes/pathName';

const Backtests = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Backtests', href: backtests },
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Backtests
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={backtests}/>
    </Fragment>
  )
}

export default Backtests