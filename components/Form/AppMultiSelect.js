import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip, FormControl, FormHelperText } from "@mui/material";
import { useCallback } from "react";
import { useFormikContext } from "formik";

export default function AppMutltiSelectField({
  name,
  options,
  label,
  required,
  sx,
  helpText,
  ...props
}) {
  const { touched, values, errors, setFieldValue } = useFormikContext();
  const [value, setValue] = React.useState([]);

  const handleClick = useCallback(
    (e, newValue) => {
      if (JSON.stringify(value) === JSON.stringify(newValue)) {
        setValue((prev) => prev.slice(0, -1));
        setFieldValue(name, values[name]?.slice(0, -1));
        return;
      }
      let stringElem = null;

      newValue.forEach((nVal) => {
        if (typeof nVal === "string") {
          stringElem = {
            label: nVal,
            value: nVal.toLowerCase(),
          };
        }
      });

      if (stringElem) {
        if (value.filter((v) => v.value === stringElem.value).length > 0) {
          return;
        }
        setValue((prev) => [...prev, stringElem]);
        setFieldValue(name, [...values[name], stringElem]);
        return;
      }

      setValue(newValue);
      setFieldValue(name, newValue);
    },
    [value, setFieldValue, name, values]
  );

  return (
    <FormControl
      sx={{ marginBottom: "0.25rem" }}
      fullWidth
      required={required}
      error={touched[name] && errors[name]}
    >
      <Autocomplete
        multiple
        value={values[name]}
        id="size-small-filled-multi"
        onChange={handleClick}
        options={options}
        getOptionLabel={(option) => {
          if (option.inputValue) {
            return option.inputValue;
          }

          return option.label;
        }}
        freeSolo
        renderTags={(value, getTagProps) => {
          return value.map((option, index) => (
            <Chip
              key={option + index}
              label={option.label}
              size="small"
              sx={{
                color: "grey.700",
              }}
              onDelete={() => {
                setValue((prev) => prev.filter((p) => p !== option));
                setFieldValue(
                  name,
                  values[name]?.filter((p) => p !== option)
                );
              }}
            />
          ));
        }}
        sx={{
          ...sx,
        }}
        renderInput={(params) => (
          <TextField
            error={touched[name] && errors[name]}
            {...params}
            aria-describedby={`${name}-help-text`}
            label={label}
          />
        )}
        {...props}
      />

      <FormHelperText id={`${name}-help-text`}>
        {touched[name] && errors[name] ? errors[name] : helpText}
      </FormHelperText>
    </FormControl>
  );
}
