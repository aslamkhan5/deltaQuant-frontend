import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { styled } from "@mui/system";

const PasswordInputWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
});

const useStyles = {
  eyeButton: {
    marginLeft: "8px", // Adjust the margin as needed
  },
  disabledPasswordInput: {
    opacity: 0.5,
  },
};

const PasswordInput = (props) => {
  const { showPassword, handleTogglePassword, disabled, className, name, placeholder, autoComplete, onChange, value } = props;

  return (
    <PasswordInputWrapper className={`${disabled ? useStyles.disabledPasswordInput : ""} ${className}`}>
      <TextField
        // type={showPassword ? "text" : "password"}
        type="password"
        fullWidth
        name={name}
        placeholder={placeholder}
        className="password-input"
        onChange={onChange}
        sx={{ background: "white",borderRadius:1 }}
        autoComplete={autoComplete}
        disabled={disabled}
        value={value}
        variant="outlined"
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <IconButton
        //         aria-label="toggle password visibility"
        //         onClick={handleTogglePassword}
        //         edge="end"
        //         style={useStyles.eyeButton}
        //       >
        //         {showPassword ? <FaEye /> : <FaEyeSlash />}
        //       </IconButton>
        //     </InputAdornment>
        //   ),
        // }}
      />
    </PasswordInputWrapper>
  );
};

export default PasswordInput;
