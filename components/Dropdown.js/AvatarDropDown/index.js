import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { IoMdNotifications } from "react-icons/io";
import { Avatar, Badge, MenuItem } from "@mui/material";
import { BsCheckAll } from "react-icons/bs";
import styled from "@emotion/styled";
import { useAppContext } from "../../../context";
import { getNameFromEmail } from "../../../utils/utils";

const CustomMenuItem = styled(MenuItem)`
  border-radius: 8px;
`;

function AvatarDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [{ user }] = useAppContext();
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
          sx={{
            ml: 2,
            color: open ? "primary.main" : "grey.600",
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          disableRipple
        >
          <Avatar
            src={user?.profileUrl || "/astronaut.png"}
            sx={{
              width: "2.4rem",
              height: "2.4rem",
              "&::before": {
                content: '""',
                zIndex: 1,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                backgroundColor: "rgba(22, 28, 36, 0.8)",
                opacity: open ? 1 : 0,
              },
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
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
            color: "grey.800",
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
            pr: 4,
            pt: 1,
            borderBottom: "1px dashed",
            borderColor: "grey.400",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ mb: 0, fontWeight: "600", textTransform: "capitalize" }}
          >
            {user?.displayName || getNameFromEmail(user?.email)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray", mb: 1, fontWeight: "400" }}
          >
            {user?.email}
          </Typography>
        </Box>
        <Box
          px={1}
          py={1}
          sx={{ borderBottom: "1px dashed", borderColor: "grey.400" }}
        >
          <CustomMenuItem>Home</CustomMenuItem>
          <CustomMenuItem>Profile</CustomMenuItem>
          <CustomMenuItem>Settings</CustomMenuItem>
        </Box>
        <Box px={1} pt={1} sx={{}}>
          <CustomMenuItem>Logout</CustomMenuItem>
        </Box>
      </Menu>
    </React.Fragment>
  );
}

export default AvatarDropdown;
