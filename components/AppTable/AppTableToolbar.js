import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { FiTrash2 } from "react-icons/fi";

function AppTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        width: "100%",
        height: "100%",
        paddingLeft: "0",
        p: "0.8rem 0.8rem 0.8rem 0rem",
        border: "none",
        borderBottom: "none",
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>

      <Tooltip title="Delete">
        <IconButton color="inherit" size="small" sx={{ padding: 1 }}>
          <FiTrash2 />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

AppTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default AppTableToolbar;
