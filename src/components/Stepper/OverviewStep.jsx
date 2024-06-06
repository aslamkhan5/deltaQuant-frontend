import { Box } from "@mui/material";
import CustomTextField from "../CustomTextField";
import { defaultSpacing } from "../../constants";

const OverviewStep = ({ botName, strategy, parameters, entry, exit, handleChange, errors }) => (
    <Box>
      <CustomTextField
        placeholder="Bot Name"
        backgroundColor="transparent"
        textColor="#FFFFFF"
        type="text"
        id="botName"
        name="botName"
        value={botName || ''}
        onChange={handleChange}
        error={!!errors.botName}
        helperText={errors.botName}
        mt={defaultSpacing}
        fullWidth
      />
      <CustomTextField
        placeholder="Strategy"
        backgroundColor="transparent"
        textColor="#FFFFFF"
        type="text"
        id="strategy"
        name="strategy"
        value={strategy || ''}
        onChange={handleChange}
        error={!!errors.strategy}
        helperText={errors.strategy}
        mt={defaultSpacing}
        fullWidth
      />
      <CustomTextField
        placeholder="Parameters"
        backgroundColor="transparent"
        textColor="#FFFFFF"
        type="text"
        id="parameters"
        name="parameters"
        value={parameters || ''}
        onChange={handleChange}
        error={!!errors.parameters}
        helperText={errors.parameters}
        mt={defaultSpacing}
        fullWidth
      />
    </Box>
  );
export default OverviewStep
  