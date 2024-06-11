import React from 'react'
import CustomTextField from '../../components/CustomTextField'
import { Box } from '@mui/material'
import { defaultSpacing } from '../../constants'

const CreatePaperTradingAccountForm = ({initialBalance, accountName, currency, handleChange, errors}) => {
  return (
    <Box>
      <CustomTextField
        placeholder="Initail Balance"
        backgroundColor="transparent"
        textColor="#FFFFFF"
        type="text"
        id="initialBalance"
        name="initialBalance"
        value={initialBalance || ''}
        onChange={handleChange}
        error={!!errors.initialBalance}
        helperText={errors.initialBalance}
        mt={defaultSpacing}
        fullWidth
      />
      <CustomTextField
        placeholder="Account Name"
        backgroundColor="transparent"
        textColor="#FFFFFF"
        type="text"
        id="accountName"
        name="accountName"
        value={accountName || ''}
        onChange={handleChange}
        error={!!errors.accountName}
        helperText={errors.accountName}
        mt={defaultSpacing}
        fullWidth
      />
      <CustomTextField
        placeholder="Currency"
        backgroundColor="transparent"
        textColor="#FFFFFF"
        type="text"
        id="currency"
        name="currency"
        value={currency || ''}
        onChange={handleChange}
        error={!!errors.currency}
        helperText={errors.currency}
        mt={defaultSpacing}
        fullWidth
      />
    </Box>
  )
}

export default CreatePaperTradingAccountForm