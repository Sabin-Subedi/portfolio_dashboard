import { Box, Typography, Stack, Tooltip, Button } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import Image from "next/image";
import { FcImageFile } from "react-icons/fc";
import { FiX } from "react-icons/fi";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

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

function Dropzone({ withThumbnail = false }) {
  const [files, setfiles] = useState([]);
  const [failReason, setfailReason] = useState(null);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles, fileRejection) => {
    setfailReason();

    setfiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => {
        file.key = uuidv4();
        return file;
      }),
    ]);
    console.log(fileRejection);
    if (
      fileRejection.length > 0 &&
      fileRejection[0]?.errors[0]?.code === "too-many-files"
    ) {
      console.log("sadasdl");
      setfailReason(`Too many Files. Only 2 files are allowed at a time.`);
    }
    setRejectedFiles((prev) => [...prev, ...fileRejection]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    onDrop,
    maxSize: 1 * 1000 * 1000,
    onFileDialogOpen: () => setfailReason(null),
  });

  const selectedFiles = files.map((file) =>
    withThumbnail ? (
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
              onClick={() =>
                setfiles((prev) => prev.filter((fi) => file.key !== fi.key))
              }
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
        key={file.key}
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
          onClick={() =>
            setfiles((prev) => prev.filter((fi) => file.key !== fi.key))
          }
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
      {failReason && <Typography color="error.main">{failReason}</Typography>}
      <aside>
        <h4>Files</h4>
        <Stack direction={withThumbnail ? "row" : "column"} spacing={1}>
          {selectedFiles}
        </Stack>
      </aside>
    </section>
  );
}

export default Dropzone;
