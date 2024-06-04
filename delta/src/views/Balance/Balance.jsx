import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { balance } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';

const Balance = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Balance', href: balance },
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Balance
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={balance}/>
    </Fragment>
  )
}

export default Balance