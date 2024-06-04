import { Button, Grid, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import BotTable from './BotTable'
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';
import { bots } from '../../routes/pathName';
import FilterButtonWithDrawer from '../../components/FilterButtonWithDrawer';
import GenericModal from '../../components/GenericModal';
import HorizontalLinearAlternativeLabelStepper from '../../components/HorizontalLinearAlternativeLabelStepper';

const Bots = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateBotModalOpen,setIsCreateBotModalOpen] = useState(false)
  const [createBotFormData, setCreateBotFormData] = useState(null)
  const [activateFormData, setActivateBotFormData] = useState(null)
  const [isActivateModalOpen,setIsActivateModalOpen] = useState(false)
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Bots', href: bots },
  ];
  function createData(bot, status, entry, exit) {
    return { bot, status, entry, exit };
  }
  const handleCreateBotClose = () => {
    setIsCreateBotModalOpen(false)
  }
  const handleActiveModalClose = () => {
    setIsActivateModalOpen(false)
  }

  const handleBotSubmit = () => {

  }
  
  const handleActivateSubmit = () => {

  }
  const rows = [
    createData('Premium', 'Premium', 'Premium', '--'),
    createData('Premium', 'Premium', 'Premium', '--'),
    createData('Premium', 'Premium', 'Premium', '--'),
    createData('Premium', 'Premium', 'Premium', '--'),
    createData('Premium', 'Premium', 'Premium', '--'),
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 600, fontSize: 32 }}
      >
        Bot
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item>
          <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={bots} />
        </Grid>
        <Grid item>
          <Button sx={{ background: '#233228',mr:1 }}>Log</Button>
          <Button sx={{ background: '#233228',mr:1 }} onClick={()=>setIsActivateModalOpen(true)}>Activate/deactivate</Button>
          <Button sx={{ background: '#233228',mr:1 }} onClick={()=>setIsCreateBotModalOpen(true)}>Create Bot Model</Button>
          <FilterButtonWithDrawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
          <GenericModal open={isCreateBotModalOpen} handleClose={handleCreateBotClose} title="Create Bot" handleSubmit={handleBotSubmit}>
            <HorizontalLinearAlternativeLabelStepper/>
          </GenericModal>
          <GenericModal open={isActivateModalOpen} handleClose={handleActiveModalClose} title="Activate and Deactivate" handleSubmit={handleActivateSubmit}>
            <Typography>No content currently</Typography>
          </GenericModal>
        </Grid>
      </Grid>
      <BotTable rows={rows} />
    </Fragment>
  )
}

export default Bots