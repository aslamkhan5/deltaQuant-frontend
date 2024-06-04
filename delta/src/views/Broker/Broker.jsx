import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { broker } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';

const Broker = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Broker', href: broker },
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Broker
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={broker}/>
    </Fragment>
  )
}

export default Broker