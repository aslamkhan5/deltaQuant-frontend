import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EmailVerificationModal = ({ show, onClose, title, description, icon }) => {
  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>
        <div style={{ textAlign: 'center' }}>
          <img src={icon} alt="" style={{ marginBottom: '1rem' }} />
        </div>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" gutterBottom>
          <span>{title}</span>
        </Typography>
        <Typography className="modal-desc">{description}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationModal;
