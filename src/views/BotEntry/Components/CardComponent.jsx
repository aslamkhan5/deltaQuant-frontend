import React from 'react'
import { Card } from '@mui/material'

const CardComponent = ({ children }) => {
    return (
        <Card sx={{ mb: 4, background: "#121212", m: 0, p: 0 }}>
            {children}
        </Card>
    )
}

export default CardComponent
