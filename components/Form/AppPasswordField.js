import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AppInputField from "./AppInputField";

function AppPasswordField({ type, ...otherProps }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AppInputField
      {...otherProps}
      type={showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment sx={{ pr: 1 }} position="end">
          <IconButton
            size="medium"
            sx={{
              color: "grey.600",
            }}
            aria-label="toggle password visibility"
            onClick={() => setShowPassword((prev) => !prev)}
            // onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {!showPassword ? <FiEye /> : <FiEyeOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export default AppPasswordField;
