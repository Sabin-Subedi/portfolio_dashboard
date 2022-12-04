import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { FcImageFile } from "react-icons/fc";
import { FiX } from "react-icons/fi";
import LinearProgressWithLabel from "../Loader/LinearProgressWithLabel";

function FileDetailView({ file, onRemove, error, fileSize }) {
  const progress = Boolean(file.progress >= 0 && file.progress < 100);

  return file ? (
    <Box
      border={1}
      p={1}
      px={2}
      sx={{
        width: "100%",
        display: "flex",
        position: "relative",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: error ? "error.lighter" : "transparent",
        borderColor: error ? "error.main" : "grey.300",
        borderRadius: "0.5rem",
        cursor: "default",
        zIndex: 10,
        "&::before": {
          content: "''",
          position: "absolute",
          width: `${file?.progress}%`,
          height: "100%",
          backgroundColor: "grey.200",
          opacity: progress ? 1 : 0,
          zIndex: 0,
          left: 0,
        },
      }}
      key={file.key}
    >
      <FcImageFile style={{ zIndex: 10 }} size={40} />
      <Box style={{ zIndex: 10, flex: 1 }} ml={1}>
        <Typography
          mb={0}
          variant="body2"
          color={error ? "error.dark" : "grey.700"}
        >
          {progress ? "Uploading..." : file.name}
        </Typography>
        {progress ? (
          <LinearProgressWithLabel
            color="success"
            preText={` ${(file.size / 1000).toFixed(2)} KB - `}
            value={file.progress}
          />
        ) : (
          <Typography
            mt={0}
            variant="caption"
            color={error ? "error.main" : "grey.500"}
          >
            {error
              ? error.code === "file-too-large"
                ? ` ${(file.size / 1000).toFixed(
                    2
                  )} KB - File is larger than ${(fileSize / 1000).toFixed(
                    0
                  )} KB `
                : error.message
              : ` ${(file.size / 1000).toFixed(2)} KB`}
          </Typography>
        )}
      </Box>
      {progress ? (
        <CircularProgress color="success" size={15} sx={{ width: "0.4rem" }} />
      ) : (
        <Box
          px={1}
          py={0.7}
          borderRadius="100%"
          ml="auto"
          onClick={onRemove}
          sx={{
            transition: "all 0.2s ease-in",
            cursor: "pointer",
            zIndex: 100,
            color: error ? "error.darker" : "grey.600",
            "&:hover": {
              backgroundColor: error ? "error.light" : "grey.200",
            },
          }}
        >
          <FiX size={14} />
        </Box>
      )}
    </Box>
  ) : null;
}

export default FileDetailView;
