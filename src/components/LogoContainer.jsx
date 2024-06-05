import React from 'react'
import logo from '../assets/images/logo-with-icon.png'
import { Box } from '@mui/material'

const LogoContainer = () => {
    return (
        <Box
            component="img"
            sx={{
                objectFit: 'contain',
                // height:75,
                // width:100
            }}
            alt="card with circle"
            src={logo}
        />
    )
}

export default LogoContainer