import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppTextField({
  name,
  label,
  fullWidth,
  required,
  helpText,
  minRows = 8,
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
      {/* {label && (
        <InputLabel htmlFor={name} aria-labelledby={name}>
          {label}
        </InputLabel>
      )} */}
      <TextareaAutosize
        minRows={minRows}
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        label={label}
        {...otherProps}
        aria-describedby={`${name}-help-text`}
      />

      <FormHelperText id={`${name}-help-text`}>
        {touched[name] && errors[name] ? errors[name] : helpText}
      </FormHelperText>
    </FormControl>
  );
}

export default AppTextField;
