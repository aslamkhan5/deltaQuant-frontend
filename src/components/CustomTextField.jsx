import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ backgroundColor, textColor, ...props }) => {
  return (
    <TextField
    //   variant="outlined"
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: backgroundColor,
        //   borderRadius: 2,
          color: textColor,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)', // Default border color
          },
          '&:hover fieldset': {
            borderColor: '#ff0000', // Hover border color
          },
          '&.Mui-focused fieldset': {
            borderColor: '#00ff00', // Focused border color
          },
        },
      }}
      {...props} // Spread the remaining props onto TextField
    />
  );
};

export default CustomTextField;
