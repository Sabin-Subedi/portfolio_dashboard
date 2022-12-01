import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { IoMdNotifications } from "react-icons/io";
import { Badge } from "@mui/material";
import { BsCheckAll } from "react-icons/bs";

function NotificationDropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          sx={{ ml: 2, color: open ? "primary.main" : "grey.600" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge
            badgeContent={3}
            color="error"
            sx={{
              fontSize: "1.35rem",
            }}
          >
            <IoMdNotifications />
          </Badge>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
            mt: 1,
            borderRadius: "8px",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            pl: 2,
            pr: 3,
            pt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px dashed",
            borderColor: "grey.400",
          }}
        >
          <Box sx={{ mr: 12, mb: 2 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              You have 2 unread messages
            </Typography>
          </Box>

          <IconButton color="primary">
            <BsCheckAll />
          </IconButton>
        </Box>
      </Menu>
    </React.Fragment>
  );
}

export default NotificationDropDown;
