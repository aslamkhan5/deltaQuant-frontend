import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { guide } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';

const Guide = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Guide', href: guide },
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Guide
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={guide}/>
    </Fragment>
  )
}

export default Guide