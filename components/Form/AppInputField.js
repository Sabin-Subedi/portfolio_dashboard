import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppInputField({
  name,
  label,
  fullWidth,
  required,
  helpText,
  ...otherProps
}) {
  const { handleChange, handleBlur, values, errors, touched } =
    useFormikContext();
  return (
    <FormControl
      sx={{ marginBottom: "1rem" }}
      fullWidth={fullWidth}
      required={required}
      error={touched[name] && errors[name]}
    >
      {label && (
        <InputLabel htmlFor={name} aria-labelledby={name}>
          {label}
        </InputLabel>
      )}
      <OutlinedInput
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        value={values[name]}
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

export default AppInputField;
