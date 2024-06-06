import React from 'react'
import logo from '../assets/images/logo-with-icon.png'
import { Box, Grid } from '@mui/material'

const LogoContainer = () => {
    return (
        <Grid container sx={{ background: "#181818", paddingY: 1,paddingBottom:0,position:"absolute",top:0 }} direction="row" alignItems="center" justifyContent="center">
            <Grid item>
                <Box
                    component="img"
                    sx={{
                      height: 40
                    }}
                    alt="Logo"
                    src={logo}
                />
            </Grid>
        </Grid>
    )
}

export default LogoContainer