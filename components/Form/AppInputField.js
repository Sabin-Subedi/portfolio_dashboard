import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppInputField({ name, label, helpText, ...otherProps }) {
  const { handleChange, handleBlur } = useFormikContext();
  return (
    <FormControl>
      {label && (
        <InputLabel htmlFor={name} aria-labelledby={name}>
          {label}
        </InputLabel>
      )}
      <OutlinedInput
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        label={label}
        {...otherProps}
        aria-describedby={`${name}-help-text`}
      />
      {helpText && (
        <FormHelperText id={`${name}-help-text`}>{helpText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default AppInputField;
