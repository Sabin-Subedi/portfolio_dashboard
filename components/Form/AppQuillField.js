import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import dynamic from "next/dynamic";
import React from "react";
import Editor from "../Editor";

function AppQuillField({
  name,
  label,
  fullWidth = true,
  required,
  helpText,
  minRows = 8,
  ...otherProps
}) {
  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();
  return (
    <FormControl
      sx={{ marginBottom: "1.2rem" }}
      fullWidth={fullWidth}
      required={required}
      error={touched[name] && errors[name]}
    >
      {label && (
        <Typography
          as="label"
          fontWeight={500}
          color={touched[name] && errors[name] ? "error.main" : "grey.600"}
          mb={1}
          htmlFor={name}
          aria-labelledby={name}
        >
          {label}
        </Typography>
      )}
      <Editor
        onChange={(value) => {
          setFieldValue(name, value);
        }}
        value={values[name]}
        onBlur={() => setFieldTouched(name, true)}
        error={touched[name] && errors[name]}
      />
      <FormHelperText id={`${name}-help-text`}>
        {touched[name] && errors[name] ? errors[name] : helpText}
      </FormHelperText>
    </FormControl>
  );
}

export default AppQuillField;
