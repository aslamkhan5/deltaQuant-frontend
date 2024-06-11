import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { broker } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';
import BrokerTable from './BrokerTable';

const Broker = () => {
  function createData(account, broker, status, availableBalance,buyingOption,id) {
    return { account, broker, status, availableBalance,buyingOption,id };
}
const rows = [
    createData('Premium', 'Premium', 'Premium', '--', 'Premium',1),
    createData('Premium', 'Premium', 'Premium', '--', 'Premium',2),
    createData('Premium', 'Premium', 'Premium', '--', 'Premium',3),
    createData('Premium', 'Premium', 'Premium', '--', 'Premium',4),
    createData('Premium', 'Premium', 'Premium', '--', 'Premium',5),
    createData('Premium', 'Premium', 'Premium', '--', 'Premium',6),
    createData('Premium', 'Premium', 'Premium', '--', 'Premium',7),
    createData('Premium', 'Premium', 'Premium', '--', 'Premium',8),
  ];
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
      <BrokerTable rows={rows}/>
    </Fragment>
  )
}

export default Broker