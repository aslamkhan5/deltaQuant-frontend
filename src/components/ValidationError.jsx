import { Box } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const ValidationError = ({error}) => {
  return (
    <Box sx={{backgroundColor:"#E6828E",padding:1,color:"black",fontWeight:"600",fontSize:'22px'}}>{error}</Box>
  )
}

ValidationError.propTypes = {
    error:PropTypes.string.isRequired,
}

export default ValidationError