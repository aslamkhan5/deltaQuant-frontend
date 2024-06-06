import { Box } from "@mui/material";
import CustomTextField from "../CustomTextField";

const ExitStep = ({ exit, handleChange, errors }) => (
    <Box>
      <CustomTextField
        placeholder="Exit"
        backgroundColor="transparent"
        textColor="#FFFFFF"
        type="text"
        id="exit"
        name="exit"
        value={exit || ''}
        onChange={handleChange}
        error={!!errors.exit}
        helperText={errors.exit}
        fullWidth
      />
    </Box>
  );
export default ExitStep
  