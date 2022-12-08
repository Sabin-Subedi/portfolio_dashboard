import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { errorLayout } from "./layout/error";

function Custom404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" color="grey.800" align="center" mb={3}>
        Sorry, page not found!
      </Typography>
      <Typography
        variant="caption"
        fontSize={16}
        mb={5}
        color="grey.600"
        sx={{
          maxWidth: "25rem",
        }}
        align="center"
      >
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </Typography>
      <Image
        src="/404.svg"
        alt="404"
        width={350}
        height={350}
        objectFit="contain"
      />
      <Link href="/" passHref>
        <Button sx={{ mt: 2 }} color="primary" variant="contained" size="large">
          Go To Home
        </Button>
      </Link>
    </Box>
  );
}

Custom404.getLayout = errorLayout;

export default Custom404;
