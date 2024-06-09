import { Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { reports } from '../../routes/pathName';
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';
import DataSummaryGraph from '../../components/Graphs/DataSummaryGraph';
import StackedBarChart from '../../components/Graphs/StackedBarChart';
import AreaChart from '../../components/Graphs/AreaChart';
import LineChart from '../../components/Graphs/LineChart';
import SplineChart from '../../components/Graphs/SplineChart';

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
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={reports} />
      <DataSummaryGraph />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <StackedBarChart />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <StackedBarChart />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <LineChart />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <SplineChart />
        </Grid>
      </Grid>
      <AreaChart />
    </Fragment>
  )
}

export default Reports