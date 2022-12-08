import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import Head from "next/head";
import { Fa500Px, FaAcquisitionsIncorporated } from "react-icons/fa";
import DropDown from "../components/Dropdown.js";
import { useAppContext } from "../context/index.js";

function DisplayInfoCard({ subtitle, data, icon: Icon }) {
  return (
    <Paper
      sx={{
        p: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
      }}
    >
      <Box>
        <Typography variant="h2" color="grey.800">
          {data}
        </Typography>
        <Typography variant="subtitle1" color="grey.600">
          {subtitle}
        </Typography>
      </Box>
      <Box
        sx={{
          color: "primary.main",
        }}
      >
        <Icon size={70} />
      </Box>
    </Paper>
  );
}

export default function Home() {
  const context = useAppContext();
  return (
    <>
      <Typography variant="h4" color="grey.800">
        Hi, Welcome back
      </Typography>
      <Grid columnSpacing={4} columns={4} container mt={4}>
        <Grid item xs={1}>
          <DisplayInfoCard subtitle="Total Projects" data="90" icon={Fa500Px} />
        </Grid>
        <Grid item xs={1}>
          <DisplayInfoCard
            subtitle="Total Skills"
            data="100"
            icon={FaAcquisitionsIncorporated}
          />
        </Grid>
        <Grid item xs={1}>
          <DisplayInfoCard
            subtitle="Total Skills"
            data="100"
            icon={FaAcquisitionsIncorporated}
          />
        </Grid>
        <Grid item xs={1}>
          <DisplayInfoCard
            subtitle="Total Skills"
            data="100"
            icon={FaAcquisitionsIncorporated}
          />
        </Grid>
      </Grid>
    </>
  );
}
