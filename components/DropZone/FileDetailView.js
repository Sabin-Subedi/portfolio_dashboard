import { Box, Typography } from "@mui/material";
import React from "react";
import { FcImageFile } from "react-icons/fc";
import { FiX } from "react-icons/fi";

function FileDetailView({ file, onRemove, error, fileSize }) {
  return file ? (
    <Box
      border={1}
      p={1}
      px={2}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: error ? "error.lighter" : "transparent",
        borderColor: error ? "error.main" : "grey.300",
        borderRadius: "0.5rem",
      }}
      key={file.key}
    >
      <FcImageFile size={40} />
      <Box ml={1}>
        <Typography
          mb={0}
          variant="body2"
          color={error ? "error.dark" : "grey.700"}
        >
          {file.name}
        </Typography>
        <Typography
          mt={0}
          variant="caption"
          color={error ? "error.main" : "grey.500"}
        >
          {error
            ? error.code === "file-too-large"
              ? ` ${(file.size / 1000).toFixed(2)} KB - File is larger than ${(
                  fileSize / 1000
                ).toFixed(0)} KB `
              : error.message
            : ` ${(file.size / 1000).toFixed(2)} KB`}
        </Typography>
      </Box>
      <Box
        px={1}
        py={0.7}
        borderRadius="100%"
        ml="auto"
        onClick={onRemove}
        sx={{
          transition: "all 0.2s ease-in",
          cursor: "pointer",
          color: error ? "error.darker" : "grey.600",
          "&:hover": {
            backgroundColor: error ? "error.light" : "grey.200",
          },
        }}
      >
        <FiX size={14} />
      </Box>
    </Box>
  ) : null;
}

export default FileDetailView;
