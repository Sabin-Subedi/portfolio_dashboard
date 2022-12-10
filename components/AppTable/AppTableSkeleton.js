import { Skeleton, TableRow } from "@mui/material";
import React from "react";
import { StyledTableCell } from "./styledTableComp";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/system";

function AppTableSkeleton({ length }) {
  return (
    <TableRow>
      <StyledTableCell sx={{ padding: "0.8rem" }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "0.25rem",
            mx: "auto",
          }}
        />
      </StyledTableCell>
      {Array.from(Array(length).keys()).map((item) => (
        <StyledTableCell key={uuidv4()} sx={{}}>
          <Skeleton variant="text" sx={{ fontSize: "0.75rem" }} />
        </StyledTableCell>
      ))}
      <StyledTableCell sx={{ padding: "0.8rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          <Skeleton
            sx={{ width: "0.35rem", height: "0.35rem" }}
            variant="circular"
          />
          <Skeleton
            sx={{ width: "0.35rem", height: "0.35rem" }}
            variant="circular"
          />
          <Skeleton
            sx={{ width: "0.35rem", height: "0.35rem" }}
            variant="circular"
          />
        </Box>
      </StyledTableCell>
    </TableRow>
  );
}

export default AppTableSkeleton;
