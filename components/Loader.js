import React from "react";
import Lottie from "react-lottie";
import * as loader from "../assets/loader.json";
import { Box } from "@mui/material";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie
        options={{
          autoplay: true,
          animationData: loader,
          loop: true,
        }}
        width="10rem"
      />
    </Box>
  );
}
export default Loader;
