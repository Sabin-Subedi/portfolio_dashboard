import styled from "@emotion/styled";
import { TableCell, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[600],
    fontWeight: 600,
    padding: "0.8rem",

    border: "none",
    borderBottom: "none",
  },

  [`&.${tableCellClasses.paddingCheckbox}`]: {
    padding: "0.8rem",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "none",
    borderBottom: "none",
    padding: "0.8rem",
  },
}));
