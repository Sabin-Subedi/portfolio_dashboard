import { Box } from "@mui/material";
import React from "react";

function ToastIcon({ type, icon }) {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: type ? `${type}.lighter` : "",
          fontSize: "1.3rem",
          color: type ? `${type}.main` : "",
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        {icon}
      </Box>
    </div>
  );
}

export default ToastIcon;
