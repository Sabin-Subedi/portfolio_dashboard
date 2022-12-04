import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useMemo } from "react";
import { FiX } from "react-icons/fi";
import CircularProgressWithLabel from "../Loader/CircularProgressWithLabel";

function SingleImageView({ onRemove, file }) {
  const progress = Boolean(file.progress >= 0 && file.progress < 100);
  const progressValue = file?.progress;
  const { imageURL } = useMemo(
    () => ({
      imageURL: file?.imageUrl || URL.createObjectURL(file),
    }),
    [file]
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: "100%",
        borderRadius: "0.2rem",
        overflow: "hidden",
        height: "20rem",
        "&::before": {
          content: '""',
          width: "100%",
          position: "absolute",
          top: 0,
          background: "black",
          zIndex: 2,
          left: 0,
          height: "100%",
          opacity: progress ? 0.7 : 0.3,
          transition: "all 0.3s ease",
        },
        "&:hover::before": {
          opacity: 0.4,
        },
      }}
    >
      <Image layout="fill" objectFit="cover" src={imageURL} alt={file.name} />
      <Box
        px={0.4}
        position="absolute"
        py={0.1}
        zIndex={5}
        top={4}
        right={5}
        borderRadius="100%"
        color="black"
        ml="auto"
        onClick={onRemove}
        sx={{
          transition: "all 0.2s ease-in",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          opacity: 0.3,
          "&:hover": {
            opacity: 0.5,
          },
        }}
      >
        <Box opacity={1}>
          <FiX color="black" size={14} />
        </Box>
      </Box>
      {progress && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            filter: "none !important",
            zIndex: 10,
            transform: "translate(-50%,-50%)",
          }}
        >
          <CircularProgressWithLabel value={progressValue} />
          <Typography mt={1} variant="subtitle1" color="white">
            Uploading ....
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default SingleImageView;
