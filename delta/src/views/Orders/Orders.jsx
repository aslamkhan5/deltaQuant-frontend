import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { orders } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';

const Orders = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Orders', href: orders },
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Orders
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={orders}/>
    </Fragment>
  )
}

export default Orders