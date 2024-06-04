import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const GenericModal = ({ open, handleClose, handleSubmit, title, children,showActionButton=false }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between',background:"black", alignItems: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton edge="end" color="secondary" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{background:"#565555"}}>
        {children}
      </DialogContent>
      {showActionButton && <DialogActions sx={{background:"black"}}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>}
    </Dialog>
  );
};

export default GenericModal;
