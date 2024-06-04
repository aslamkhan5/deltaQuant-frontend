import React, { Fragment, useState } from 'react';
import { Button, Drawer, Box, IconButton, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';

const FilterButtonWithDrawer = ({toggleDrawer,isDrawerOpen}) => {

  return (
    <Fragment>
      <Button
        sx={{ background: '#2C2C2C', color: 'white' }}
        startIcon={<TuneIcon />}
        onClick={toggleDrawer(true)}
      >
        Filter
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 300, padding: 2,background:"black",height:"100%" }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon color='secondary'/>
            </IconButton>
          </Box>
          {/* Add your filter form or content here */}
          <Box sx={{ mt: 2 }}>
            {/* Example filter content */}
            <Typography>Filter content goes here</Typography>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default FilterButtonWithDrawer;
