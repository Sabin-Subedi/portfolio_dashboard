import { Box, Typography } from "@mui/material";
import React from "react";
import BreadCrumb from "../BreadCrumb";

function PageHeader({ title, breadcrumbs = [], extraComp }) {
  return (
    <Box
      mb={4}
      sx={{
        display: "flex",

        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Typography fontWeight={600} color="grey.800" variant="h4">
          {title}
        </Typography>
        {breadcrumbs?.length > 0 && <BreadCrumb breadcrumbs={breadcrumbs} />}
      </div>
      {extraComp}
    </Box>
  );
}

export default PageHeader;
