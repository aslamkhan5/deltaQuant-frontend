import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';
import { botEntry } from '../../routes/pathName';
import TabsList from './TabsList';

const BotEntry = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Bot Entry', href: botEntry },
  ];

  function createData(stops, percentage, speed, aggressive) {
    return { stops, percentage, speed, aggressive };
  }
  const exitRows = [
    createData('Stop loss % >=', '80 %', 'Exit Speed', 'Aggressive'),
    createData('Stop loss % >=', '80 %', 'Exit Speed', 'Aggressive'),
    createData('Stop loss % >=', '80 %', 'Exit Speed', 'Aggressive'),
    createData('Stop loss % >=', '80 %', 'Exit Speed', 'Aggressive'),
    createData('Stop loss % >=', '80 %', 'Exit Speed', 'Aggressive'),
    createData('Stop loss % >=', '80 %', 'Exit Speed', 'Aggressive'),
  ];
  function createVariableRows(variableName, usedByBots, conditions, valueToSet, currentValue, lastUpdated) {
    return { variableName, usedByBots, conditions, valueToSet, currentValue, lastUpdated };
  }
  const variableRows = [
    createVariableRows('Pcs Kicker realized', 'Pcs Kicker realized', '', 'Bot Profit Realized Today $', '', '1 day ago'),
    createVariableRows('Pcs Kicker realized', 'Pcs Kicker realized', '', 'Bot Profit Realized Today $', '', '1 day ago'),
    createVariableRows('Pcs Kicker realized', 'Pcs Kicker realized', '', 'Bot Profit Realized Today $', '', '1 day ago'),
    createVariableRows('Pcs Kicker realized', 'Pcs Kicker realized', '', 'Bot Profit Realized Today $', '', '1 day ago'),
    createVariableRows('Pcs Kicker realized', 'Pcs Kicker realized', '', 'Bot Profit Realized Today $', '', '1 day ago'),
  ]
  function createEntryRows(key, value) {
    return { key, value};
  }
  const entryRows = [
    createEntryRows('Allocation', ''),
    createEntryRows('Frequency', 'Sequential (1 per day)'),
    createEntryRows('Quality', '1 contract'),
    createEntryRows('Expiration', ''),
    createEntryRows('Days to expiration', '0(0min-0max)'),
    createEntryRows('Strike selection', ''),
    createEntryRows('Put stroke strike delta', '29.0 (21.0 min 34.0 max)'),
    createEntryRows('Put Spread Width', '0.02$ tagret premium(2.0 max)'),
    createEntryRows('Entry filter', ''),
    createEntryRows('Days of week', 'ALL'),
    createEntryRows('Earliest entry time', '07:30 pm'),
    createEntryRows('Latest Entry Time', '09:30 pm'),
    createEntryRows('Miscellaneous', ''),
    createEntryRows('Entry Speed', 'Aggressive'),
  ]
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 400, fontSize: 16 }}
      >
        Onto Bot Entry
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={botEntry} />
      <TabsList exitRows={exitRows} variableRows={variableRows} entryRows={entryRows}/>
    </Fragment>
  )
}

export default BotEntry