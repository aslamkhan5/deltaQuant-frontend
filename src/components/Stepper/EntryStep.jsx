import { Box } from "@mui/material";
import CustomTextField from "../CustomTextField";

const EntryStep = ({ entry, handleChange, errors }) => (
    <Box>
      <CustomTextField
        placeholder="Entry"
        backgroundColor="transparent"
        textColor="#FFFFFF"
        type="text"
        id="entry"
        name="entry"
        value={entry || ''}
        onChange={handleChange}
        error={!!errors.entry}
        helperText={errors.entry}
        fullWidth
      />
    </Box>
  );
export default EntryStep
  