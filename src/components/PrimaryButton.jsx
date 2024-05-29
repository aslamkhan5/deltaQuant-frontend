import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import { primaryColor } from '../constants/color'
import { HiOutlineArrowRight } from 'react-icons/hi2'

const PrimaryButton = ({loading,onClick,title,variant,backgroundColor}) => {
  return (
    <Button 
    type="submit"
    variant={variant}
    color={backgroundColor}
    fullWidth
    style={{ backgroundColor: primaryColor }}
    disabled={loading}
    onClick={onClick}
    endIcon={
      loading ? <CircularProgress size={20} /> : <HiOutlineArrowRight />
    }>{title}</Button>
  )
}

export default PrimaryButton