import {
  Box,
  Checkbox,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import React from "react";
import AppTableToolbar from "./AppTableToolbar";
import { StyledTableCell } from "./styledTableComp";

// const headCells = [
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "Dessert (100g serving)",
//   },
//   {
//     id: "calories",
//     numeric: true,
//     disablePadding: false,
//     label: "Calories",
//   },
//   {
//     id: "fat",
//     numeric: true,
//     disablePadding: false,
//     label: "Fat (g)",
//   },
//   {
//     id: "carbs",
//     numeric: true,
//     disablePadding: false,
//     label: "Carbs (g)",
//   },
//   {
//     id: "protein",
//     numeric: true,
//     disablePadding: false,
//     label: "Protein (g)",
//   },
// ];

function AppTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const renderCheckBox = React.useMemo(() => {
    return (
      <StyledTableCell
        sx={{
          padding: numSelected > 0 ? 0 : "0.8rem",
          bgcolor: "primary.lighter",
        }}
        padding="checkbox"
      >
        <Checkbox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            "aria-label": "select all desserts",
          }}
        />
      </StyledTableCell>
    );
  }, [numSelected, rowCount, onSelectAllClick]);

  return (
    <>
      {numSelected > 0 && (
        <TableRow>
          {renderCheckBox}
          <StyledTableCell
            sx={{
              padding: 0,
              border: "none",
              ...(numSelected > 0 && {
                bgcolor: (theme) => theme.palette.primary.lighter,
                color: "primary.main",
                border: "none",
              }),
            }}
            colSpan={headCells.length}
          >
            <AppTableToolbar numSelected={numSelected} />
          </StyledTableCell>
        </TableRow>
      )}
      <TableHead sx={numSelected > 0 ? visuallyHidden : {}}>
        <TableRow>
          {renderCheckBox}
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align={
                headCell.align
                  ? headCell.align
                  : headCell.numeric
                  ? "right"
                  : "left"
              }
              //   padding={headCell.disablePadding ? "none" : "0.8rem"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}

AppTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default AppTableHead;
