import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import { defaultSpacing } from '../constants';
import CustomTextField from './CustomTextField';

const steps = ['Overview', 'Entry', 'Exit'];

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: ownerState.active ? 'green' : 'white',
  width: 30,
  height: 30,
  borderRadius: '50%',
  color: "white",
  border: ownerState.active ? '2px solid green' : '1px solid white',
  backgroundColor: 'transparent',
}));

const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;

  return (
    <CustomStepIconRoot ownerState={{ active }}>
      {completed ? <Check /> : <div>{icon}</div>}
    </CustomStepIconRoot>
  );
};

const HorizontalLinearAlternativeLabelStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    botName: '',
    strategy: '',
    parameters: '',
  });
  const [errors, setErrors] = useState({});

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the error for the current field
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (activeStep === 0 && !formValues.botName) {
      errors.botName = 'Bot name is required';
    }
    if (activeStep === 1 && !formValues.strategy) {
      errors.strategy = 'Strategy name is required';
    }
    if (activeStep === 2 && !formValues.parameters) {
      errors.parameters = 'Parameter is required';
    }
    return errors;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <CustomTextField
              placeholder="Bot Name"
              backgroundColor="#2A2A2A"
              textColor="#FFFFFF"
              type="text"
              id="search"
              name="botName"
              value={formValues.botName}
              onChange={handleChange}
              error={!!errors.botName}
              helperText={errors.botName}
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <CustomTextField
              placeholder="Strategy"
              backgroundColor="#2A2A2A"
              textColor="#FFFFFF"
              type="text"
              id="search"
              name="strategy"
              value={formValues.strategy}
              onChange={handleChange}
              error={!!errors.strategy}
              helperText={errors.strategy}
              fullWidth
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <CustomTextField
              placeholder="Parameters"
              backgroundColor="#2A2A2A"
              textColor="#FFFFFF"
              type="text"
              id="search"
              name="parameters"
              value={formValues.parameters}
              onChange={handleChange}
              error={!!errors.parameters}
              helperText={errors.parameters}
              fullWidth
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', mt: defaultSpacing }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<StepConnector />}
        sx={{
          backgroundColor: 'transparent',
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => (
                <CustomStepIcon {...props} icon={index + 1} />
              )}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        {getStepContent(activeStep)}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
        )}
        <Button onClick={handleNext} variant="contained" color="primary">
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default HorizontalLinearAlternativeLabelStepper;
