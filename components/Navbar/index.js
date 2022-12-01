import { Badge, Box, IconButton } from "@mui/material";
import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { MdNotifications } from "react-icons/md";
import DropDown from "../Dropdown.js";
import AvatarDropdown from "../Dropdown.js/AvatarDropDown/index.js";
import NotificationDropDown from "../Dropdown.js/NotificaitonDropDown/index.js";

function Navbar() {
  return (
    <Box sx={{ display: "flex", py: 4, justifyContent: "flex-end" }}>
      <NotificationDropDown />
      <AvatarDropdown />
    </Box>
  );
}

export default Navbar;
