import { Box, Typography, Stack, Tooltip, Button } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import Image from "next/image";
import { FcImageFile } from "react-icons/fc";
import { FiX } from "react-icons/fi";
import { useCallback } from "react";

const DropBox = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "relative",
  minHeight: "10rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.3rem",
  padding: "1.4rem 0",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
}));

function Dropzone({ withThumbnail = true }) {
  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
  });

  const files = acceptedFiles.map((file) =>
    withThumbnail ? (
      <Box
        key={file}
        sx={{
          position: "relative",
          width: "5rem",
          height: "5rem",
          borderRadius: "0.5rem",
          overflow: "hidden",
          pointerEvents: "all",
        }}
      >
        <div data-tip="dsads">
          <Image
            src={URL.createObjectURL(file)}
            layout="fill"
            alt={file.name}
          />
        </div>
      </Box>
    ) : (
      <Box
        border={1}
        p={1}
        px={2}
        sx={{
          display: "flex",
          alignItems: "center",
          borderColor: "grey.300",
          borderRadius: "0.5rem",
        }}
        key={file}
      >
        <FcImageFile size={40} />
        <Box ml={1}>
          <Typography mb={0} variant="body2" color="grey.700">
            {file.name}
          </Typography>
          <Typography mt={0} variant="caption" color="grey.500">
            {(file.size / 1000).toFixed(2)} KB
          </Typography>
        </Box>
        <Box
          px={1}
          py={0.75}
          borderRadius="100%"
          color="grey.600"
          ml="auto"
          sx={{
            transition: "all 0.2s ease-in",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "grey.200",
            },
          }}
        >
          <FiX size={14} />
        </Box>
      </Box>
    )
  );

  return (
    <section className="container">
      <DropBox
        border={1}
        sx={{
          borderStyle: "dashed",
          borderColor: "grey.400",
          backgroundColor: "grey.200",
          "&::before": {
            content: '""',
            width: "100%",
            position: "absolute",
            top: 0,
            background: "white",
            zIndex: 2,
            left: 0,
            height: "100%",
            opacity: 0,

            transition: "all 0.3s ease",
          },
          "&:hover::before": {
            opacity: 0.4,
          },
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <Box
          mr={3}
          sx={{
            position: "relative",
            minWidth: "12rem",
            minHeight: "10rem",
          }}
        >
          <Image src="/file_upload.svg" layout="fill" alt="File Upload" />
        </Box>
        <Box>
          <Typography color="grey.800" variant="h5">
            Drop or Select file
          </Typography>
          <Typography fontWeight={300} fontSize="1rem" color="grey.600">
            Drop files or click{" "}
            <Typography
              as="span"
              fontWeight={300}
              color="primary.main"
              sx={{ textDecoration: "underline" }}
            >
              browse
            </Typography>{" "}
            through your machine
          </Typography>
        </Box>
      </DropBox>
      <aside>
        <h4>Files</h4>
        <Stack direction={withThumbnail ? "row" : "column"} spacing={1}>
          {files}
        </Stack>
      </aside>
    </section>
  );
}

export default Dropzone;
