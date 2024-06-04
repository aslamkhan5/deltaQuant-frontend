import React from 'react';
import { Gif } from '../utils/images';
import { CircularProgress, Grid } from '@mui/material';

const LoaderGif = () => {

    return (
        <Grid container className='main-wrapper'>
            <CircularProgress size={20}/>
        </Grid>
    )
}

export default LoaderGif