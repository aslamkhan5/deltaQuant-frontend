import React, { Fragment, SyntheticEvent, useState } from 'react'
import { Box, Button, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles'
import CardComponent from './Components/CardComponent';
import Exit from './Components/Exit';
import Variables from './Components/Variables';
import Entry from './Components/Entry';
import { toast } from 'react-toastify';
import Overview from './Components/Overview';

const BotTabs = styled(Tabs)(({ theme }) => ({
  border: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    // margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    },
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const TabPanel = ({ children, value, index }) => {
  return value === index && <Box sx={{ p: 3 }}>{children}</Box>
}

const TabsList = ({ exitRows, variableRows, entryRows }) => {
  const theme = useTheme()
  const [value, setValue] = useState(1)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Fragment>
      <BotTabs value={value} onChange={handleChange} aria-label='simple tabs example' variant="scrollable" scrollButtons="auto">
        <Tab
          label={
            <Box sx={{
              display: 'flex', alignItems: 'center', '& .Mui-selected': {
                boxShadow: theme.shadows[2],
                backgroundColor: theme.palette.primary.main,
                color: `${theme.palette.common.white} !important`
              },
            }}>
              Overview
            </Box>
          }
          value={1}
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              Entry
            </Box>
          }
          value={2}
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              Exit
            </Box>
          }
          value={3}
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              Adjustments
            </Box>
          }
          value={4}
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              Notification
            </Box>
          }
          value={5}
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              Variables
            </Box>
          }
          value={6}
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              Performance
            </Box>
          }
          value={7}
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              Log
            </Box>
          }
          value={8}
        />
      </BotTabs>
      <TabPanel value={value} index={1}>
        <CardComponent>
          <Overview />
        </CardComponent>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CardComponent>
          <Entry rows={entryRows} />
        </CardComponent>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CardComponent>
          <Exit rows={exitRows} />
        </CardComponent>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CardComponent>
          Adjustments
        </CardComponent>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <CardComponent>
          Notification
        </CardComponent>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <CardComponent>
          <Variables rows={variableRows} />
        </CardComponent>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <CardComponent>
          Performance
        </CardComponent>
      </TabPanel>
      <TabPanel value={value} index={8}>
        <CardComponent>
          Log
        </CardComponent>
      </TabPanel>
    </Fragment>
  )
}

export default TabsList
