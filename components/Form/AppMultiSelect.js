import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";
import { useCallback } from "react";

export default function FreeSoloCreateOption({ label, sx, ...props }) {
  const [value, setValue] = React.useState([]);

  const handleClick = useCallback(
    (e, newValue) => {
      if (JSON.stringify(value) === JSON.stringify(newValue)) {
        setValue((prev) => prev.slice(0, -1));
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
        return;
      }

      setValue(newValue);
    },
    [value]
  );

  return (
    <Autocomplete
      multiple
      value={value}
      id="size-small-filled-multi"
      onChange={handleClick}
      options={top100Films}
      defaultValue={[top100Films[13]]}
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
            key={option}
            label={option.label}
            size="small"
            sx={{
              color: "grey.700",
            }}
            onDelete={() => {
              setValue((prev) => prev.filter((p) => p !== option));
            }}
          />
        ));
      }}
      sx={{
        margin: "1rem 0",
        ...sx,
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      {...props}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [{ label: "React", value: "react" }];
