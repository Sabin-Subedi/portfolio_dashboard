import styled from "@emotion/styled";
// import Switch from "rc-switch";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Switch,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const MySwitch = styled(Switch)(({ theme }) => ({
  "&:active": {
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      transform: "translateX(13px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
      },
    },
  },
}));

function AppSwitchField({
  name,
  label,
  fullWidth = false,
  required,
  helpText,
  ...otherProps
}) {
  const { handleChange, handleBlur, values, errors, touched } =
    useFormikContext();
  return (
    <FormControl
      sx={{ marginBottom: "1.2rem" }}
      fullWidth={fullWidth}
      required={required}
      error={touched[name] && errors[name]}
    >
      {label && (
        <FormControlLabel
          control={
            <MySwitch
              onChange={handleChange}
              onBlur={handleBlur}
              id={name}
              checked={values[name]}
            />
          }
          label={label}
        />
      )}

      <FormHelperText id={`${name}-help-text`}>
        {touched[name] && errors[name] ? errors[name] : helpText}
      </FormHelperText>
    </FormControl>
  );
}

export default AppSwitchField;
