import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import { defaultSpacing } from '../../constants';

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: ownerState.active ? 'green' : 'white',
  width: 30,
  height: 30,
  borderRadius: '50%',
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

const HorizontalLinearAlternativeLabelStepper = ({ handleClose, stepsSchema, formValues, setFormValues }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});

  const isLastStep = activeStep === stepsSchema.length - 1;

  const handleNext = () => {
    // Check if the next step exists
    const nextStepExists = activeStep < stepsSchema.length - 1;
  
    // If it's the last step, handle the form submission
    if (!nextStepExists) {
      handleClose();
      return; // Exit the function early
    }
  
    // Perform validation for the current step
    const validationErrors = stepsSchema[activeStep].validate(formValues);
  
    if (Object.keys(validationErrors).length === 0) {
      // If there are no validation errors, proceed to the next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // If there are validation errors, set the errors state
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

  const getStepContent = (step) => {
    const { content } = stepsSchema[step];
    return content(formValues, handleChange, errors);
  };
  

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<StepConnector />}
        sx={{ backgroundColor: 'transparent' }}
      >
        {stepsSchema.map((step, index) => (
          <Step key={step.label} sx={{mt:defaultSpacing}}>
            <StepLabel
              StepIconComponent={(props) => (
                <CustomStepIcon {...props} icon={index + 1} />
              )}
            >
              {step.label}
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
