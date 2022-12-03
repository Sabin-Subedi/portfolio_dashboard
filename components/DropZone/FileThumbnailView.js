import { Box, Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";
import { FiX } from "react-icons/fi";

function FileThumbnailView({ file, onRemove }) {
  return file ? (
    <Tooltip
      sx={{ backgroundColor: "black" }}
      placement="bottom"
      title={file.name}
      key={file.key}
    >
      <Box
        key={file}
        sx={{
          position: "relative",
          width: "6rem",
          height: "6rem",
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      >
        <>
          <Image
            src={URL.createObjectURL(file)}
            layout="fill"
            alt={file.name}
          />
          <Box
            px={0.5}
            position="absolute"
            py={0.2}
            top={4}
            right={5}
            borderRadius="100%"
            color="grey.600"
            ml="auto"
            onClick={onRemove}
            sx={{
              transition: "all 0.2s ease-in",
              cursor: "pointer",
              backgroundColor: "black",
              opacity: 0.3,
              "&:hover": {
                opacity: 0.5,
              },
            }}
          >
            <Box opacity={1}>
              <FiX color="white" size={14} />
            </Box>
          </Box>
        </>
      </Box>
    </Tooltip>
  ) : null;
}

export default FileThumbnailView;
