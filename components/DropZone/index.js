import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { firebase } from "../../firebase/firebase";
import useFirebaseStorage from "../../hooks/useFirebaseStorage";
import FileDetailView from "./FileDetailView";
import FileThumbnailView from "./FileThumbnailView";
import SingleImageView from "./SingleImageView";

const DropBox = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "10rem",
  borderRadius: "0.3rem",
  padding: "1rem 1rem",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
}));

function Dropzone({
  withThumbnail = false,
  maxFiles = 1,
  fileSize = 1 * 1000 * 1000,
}) {
  const { loading, error, data, fire } = useFirebaseStorage({});
  const [files, setFiles] = useState([]);
  const [filesUploadProgress, setFilesUploadProgress] = useState([]);
  const [failReason, setFailReason] = useState(null);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles, failedFiles) => {
      setFailReason();

      if (failedFiles.length > 0 && maxFiles === 1) {
        if (failedFiles[0]?.errors[0]?.code === "file-too-large") {
          setFailReason(
            ` ${(failedFiles[0]?.file.size / 1000).toFixed(
              2
            )} KB - File is larger than ${(fileSize / 1000).toFixed(
              0
            )} KB. Please Upload Files less than 100KB`
          );
          return;
        }
        setFailReason(failedFiles[0]?.errors[0]?.message);
        return;
      }
      if (
        failedFiles.length > 0 &&
        failedFiles[0]?.errors[0]?.code === "too-many-files"
      ) {
        setFailReason(
          `Too many Files. Only ${maxFiles} files are allowed at a time.`
        );
        return;
      }
      setRejectedFiles((prev) => [
        ...prev,
        ...failedFiles.map((file) => {
          file.key = uuidv4();
          return file;
        }),
      ]);

      acceptedFiles.forEach((file) => {
        file.key = uuidv4();
        file.uploading = true;
        setFiles((prev) => [...prev, file]);

        const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
        const uploadFile = {
          ...file,
          name: fileName,
        };
        const uploadTask = firebase.uploadFileBlob(
          new Blob([file], { type: file.type }),
          fileName,
          "projects"
        );
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setFilesUploadProgress((prev) => [
              ...prev,
              {
                key: file.key,
                progress,
              },
            ]);
          },
          (error) => {
            console.log(error);
          },
          () => {
            firebase.downloadFileUrl(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
            });
          }
        );
      });

      // setFiles((prev) => [
      //   ...prev,
      //   ...acceptedFiles.map((file) => {
      //     file.key = uuidv4();
      //     return file;
      //   }),
      // ]);
    },
    [maxFiles, fileSize]
  );

  console.log(files);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles,
    multiple: maxFiles > 1,
    onDrop,
    maxSize: fileSize,
    onFileDialogOpen: () => setFailReason(null),
  });

  const selectedFiles = useMemo(
    () =>
      files.map((file) =>
        withThumbnail ? (
          <FileThumbnailView
            file={file}
            key={file.key}
            onRemove={() =>
              setFiles((prev) => prev.filter((fi) => file.key !== fi.key))
            }
          />
        ) : (
          <FileDetailView
            file={file}
            key={file.key}
            onRemove={() =>
              setFiles((prev) => prev.filter((fi) => file.key !== fi.key))
            }
          />
        )
      ),
    [files, withThumbnail]
  );

  const failedFiles = useMemo(
    () =>
      rejectedFiles.map((file) => (
        <FileDetailView
          key={file.key}
          file={file.file}
          fileSize={fileSize}
          error={file.errors && file.errors[0]}
          onRemove={() =>
            setRejectedFiles((prev) => prev.filter((fi) => file.key !== fi.key))
          }
        />
      )),
    [rejectedFiles, fileSize]
  );

  return (
    <section className="container">
      {(maxFiles == 1 || (maxFiles > 1 && files.length !== maxFiles)) && (
        <DropBox
          border={1}
          sx={{
            borderStyle: "dashed",
            borderColor: "grey.400",
            backgroundColor: "grey.200",
          }}
        >
          {files.length !== maxFiles && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
            </Box>
          )}
          {files.length === 1 && maxFiles == 1 && (
            <SingleImageView file={files[0]} onRemove={() => setFiles([])} />
          )}
        </DropBox>
      )}

      {failReason && (
        <Typography mt={1} color="error.main">
          {failReason}
        </Typography>
      )}
      {maxFiles > 1 && (
        <>
          {selectedFiles?.length > 0 && (
            <aside>
              <Typography variant="h6" mt={2}>
                Files Uploaded
              </Typography>
              <Stack
                my={1}
                direction={withThumbnail ? "row" : "column"}
                spacing={1}
              >
                {selectedFiles}
              </Stack>
            </aside>
          )}

          {failedFiles?.length > 0 && (
            <aside>
              <Typography variant="h6" color="error.main">
                File Rejected
              </Typography>
              <Stack
                mt={1}
                direction={withThumbnail ? "row" : "column"}
                spacing={1}
              >
                {failedFiles}
              </Stack>
            </aside>
          )}
        </>
      )}
    </section>
  );
}

export default Dropzone;
