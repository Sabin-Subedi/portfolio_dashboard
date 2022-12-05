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
import { FILE_UPLOAD_OPERATION } from "../../constants/FileUploadConstants";
import Dropzone from "../DropZone";
import Editor from "../Editor";

function AppFileDropField({
  name,
  label,
  fullWidth = true,
  required,
  helpText,
  minRows = 8,
  uploadFolder,
  withThumbnail,
  maxFiles = 1,
  fileSize,
  accept,
  ...otherProps
}) {
  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
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
      <Dropzone
        handleBlur={() => setFieldTouched(name)}
        handleFile={(fileUrl, operation) => {
          if (!operation) throw new Error("Operation is required");
          if (!FILE_UPLOAD_OPERATION[operation])
            throw new Error("Invalid Operation");

          if (operation === FILE_UPLOAD_OPERATION["add_file"]) {
            setFieldValue(
              name,
              Array.isArray(values[name])
                ? [...values[name], fileUrl]
                : maxFiles > 1
                ? [fileUrl]
                : fileUrl
            );
          } else if (operation === FILE_UPLOAD_OPERATION["remove_file"]) {
            setFieldValue(
              name,
              Array.isArray(values[name])
                ? values[name].filter((file) => file !== fileUrl)
                : maxFiles > 1
                ? []
                : ""
            );
          }
        }}
        error={touched[name] && errors[name]}
        uploadFolder={uploadFolder}
        withThumbnail={withThumbnail}
        maxFiles={maxFiles}
        fileSize={fileSize}
        fileValues={values[name]}
        accept={accept}
      />
      <FormHelperText id={`${name}-help-text`}>
        {touched[name] && errors[name] ? errors[name] : helpText}
      </FormHelperText>
    </FormControl>
  );
}

export default AppFileDropField;
