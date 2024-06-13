import { Button, DialogActions, Grid, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import BotTable from './BotTable'
import GenericBreadcrumbs from '../../components/GenericBreadCrumbs';
import { bots } from '../../routes/pathName';
import FilterButtonWithDrawer from '../../components/FilterButtonWithDrawer';
import GenericModal from '../../components/GenericModal';
import HorizontalLinearAlternativeLabelStepper from '../../components/Stepper/HorizontalLinearAlternativeLabelStepper';
import stepsSchema from '../../constants/botSteps';
import ActivateCheckbox from '../../components/ActivateCheckbox'
import { toast } from 'react-toastify';
const Bots = () => {
  const steps = ['Overview', 'Entry', 'Exit'];
  const [formValues, setFormValues] = useState({
    botName: '',
    strategy: '',
    parameters: '',
    entry: "",
    exit: ""
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateBotModalOpen, setIsCreateBotModalOpen] = useState(false)
  const [isEditBotModalOpen, setIsEditBotModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)
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
  function createData(bot, status, entry, exit, id) {
    return { bot, status, entry, exit, id };
  }
  const handleCreateBotClose = () => {
    setIsCreateBotModalOpen(false)
  }
  const handleEditBotClose = () => {
    setIsEditBotModalOpen(false)
  }
  const handleActiveModalClose = () => {
    setIsActivateModalOpen(false)
  }
  const handleDeleteModalClose = () => {
    setDeleteModal(false)
  }

  const handleBotSubmit = () => {

  }

  const handleActivateSubmit = () => {

  }

  const handleDeleteRow = (row) => {
    setSelectedRow(row)
    setDeleteModal(true)
  }

  const handleEditRow = (row) => {
    setSelectedRow(row)
    setFormValues({
      botName:row?.bot,
      strategy:row?.status,
      parameters:row?.parameters,
      entry:row?.entry,
      exit:row?.exit
    })
    setIsEditBotModalOpen(true)
  }

  const handleDeleteSubmit = () => {
    handleDeleteModalClose()
    toast.success("Bot deleted successfully!")
  }
  const rows = [
    createData('Premium', 'Premium', 'Premium', '--', 1),
    createData('Premium', 'Premium', 'Premium', '--', 2),
    createData('Premium', 'Premium', 'Premium', '--', 3),
    createData('Premium', 'Premium', 'Premium', '--', 4),
    createData('Premium', 'Premium', 'Premium', '--', 5),
    createData('Premium', 'Premium', 'Premium', '--', 6),
    createData('Premium', 'Premium', 'Premium', '--', 7),
    createData('Premium', 'Premium', 'Premium', '--', 8),
  ];
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 600, fontSize: 32 }}
      >
        Bots
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item>
          <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={bots} />
        </Grid>
        <Grid item>
          <Button sx={{ background: '#233228', mr: 1 }}>Log</Button>
          <Button sx={{ background: '#233228', mr: 1 }} onClick={() => setIsActivateModalOpen(true)}>Activate/deactivate</Button>
          <Button sx={{ background: '#233228', mr: 1 }} onClick={() => setIsCreateBotModalOpen(true)}>Create Bot Model</Button>
          <FilterButtonWithDrawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
          <GenericModal open={isCreateBotModalOpen} handleClose={handleCreateBotClose} title="Create Bot" handleSubmit={handleBotSubmit}>
            <HorizontalLinearAlternativeLabelStepper
              handleClose={handleCreateBotClose}
              stepsSchema={stepsSchema}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </GenericModal>
          <GenericModal open={isActivateModalOpen} handleClose={handleActiveModalClose} title="Activate and Deactivate" handleSubmit={handleActivateSubmit} contentBackground="black">
            <ActivateCheckbox />
          </GenericModal>
          <GenericModal open={deleteModal} handleClose={handleDeleteModalClose} title="Delete Bot" handleSubmit={handleDeleteSubmit}>
            <Typography padding={2}>Are you sure you want to delete "{selectedRow?.bot}"</Typography>
            <DialogActions>
              <Button onClick={handleDeleteModalClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteSubmit} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </GenericModal>
          <GenericModal open={isEditBotModalOpen} handleClose={handleEditBotClose} title="Edit Bot" handleSubmit={handleBotSubmit}>
            <HorizontalLinearAlternativeLabelStepper
              handleClose={handleEditBotClose}
              stepsSchema={stepsSchema}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </GenericModal>
        </Grid>
      </Grid>
      <BotTable rows={rows} handleDeleteRow={handleDeleteRow} handleEditRow={handleEditRow}/>
    </Fragment>
  )
}

export default Bots