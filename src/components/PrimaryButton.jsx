import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import { primaryColor } from '../constants/color'
import { HiOutlineArrowRight } from 'react-icons/hi2'

const PrimaryButton = ({loading,onClick,title,variant,backgroundColor=primaryColor,textColor="#FFFFFF"}) => {
  return (
    <Button
    variant={variant}
    fullWidth
    style={{ backgroundColor: backgroundColor,fontWeight:600,fontSize:16,color:textColor }}
    disabled={loading}
    onClick={onClick}
    endIcon={
      loading ? <CircularProgress size={20} color='secondary'/> : <HiOutlineArrowRight  display={title === "Back to Login" ? "none" : "block"}/>
    }
    >{title}</Button>
  )
}

export default PrimaryButton