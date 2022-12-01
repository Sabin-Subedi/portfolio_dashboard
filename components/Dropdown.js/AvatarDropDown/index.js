import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { IoMdNotifications } from "react-icons/io";
import { Avatar, Badge, MenuItem } from "@mui/material";
import { BsCheckAll } from "react-icons/bs";
import styled from "@emotion/styled";

const CustomMenuItem = styled(MenuItem)`
  border-radius: 8px;
`;

function AvatarDropdown() {
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
            src="data:image/jpeg;base64,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"
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
          <Typography variant="subtitle1" sx={{ mb: 0, fontWeight: "600" }}>
            Sabin Subedi
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray", mb: 1, fontWeight: "400" }}
          >
            sabinsubedi@gmail.com
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
