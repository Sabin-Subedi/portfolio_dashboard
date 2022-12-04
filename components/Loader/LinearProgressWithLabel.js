import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pr: 2,
        width: "100%",
      }}
    >
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="caption" color="grey.500">
          {props.preText}
          {`${Math.round(props.value)} %`}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ borderRadius: "10px", height: "0.2rem" }}
          variant="determinate"
          {...props}
        />
      </Box>
    </Box>
  );
}
