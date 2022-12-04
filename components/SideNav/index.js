import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { BsKanban } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaFolder, FaUser } from "react-icons/fa";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdSpeed } from "react-icons/md";
import { VscCalendar } from "react-icons/vsc";
import Logo from "../../assets/Logo";
import { useAppContext } from "../../context";
import { getNameFromEmail } from "../../utils/utils";
import NavigationLinkTab from "./NavigationLinkTab";

const menus = [
  {
    title: "General",
    menuItems: [
      {
        label: "Dashboard",
        icon: <MdSpeed />,
        link: "/app",
      },
    ],
  },
  {
    title: "Managements",
    menuItems: [
      {
        label: "User",
        icon: <FaUser />,
        link: "/user",
        subMenuItems: [
          {
            label: "Lists",
            link: "/user/lists",
          },
          {
            label: "Banned",
            link: "/user/banned",
          },
          {
            label: "Cards",
            link: "/user/cards",
          },
        ],
      },
      {
        label: "Projects",
        icon: <FaFolder />,
        link: "/projects",
        subMenuItems: [
          {
            label: "Lists",
            link: "/projects/lists",
          },
          {
            label: "Create",
            link: "/projects/create",
          },
        ],
      },
    ],
  },
  {
    title: "Your Account",
    menuItems: [
      {
        label: "Profile",
        icon: <CgProfile />,
        link: "/profile",
      },
      {
        label: "Settings",
        icon: <IoSettingsOutline />,
        link: "/settings",
      },
    ],
  },
];

function SideNav() {
  const [state, dispatch] = useAppContext();
  const { user } = state;
  return (
    <Paper
      sx={{
        py: 3,
        px: 2,
        borderRight: "1px dashed",
        borderColor: "grey.300",
        position: "fixed",
        maxHeight: "100vh",
        overflowY: "hidden",
        height: "100%",
        marginRight: 1,
        "&:hover": {
          overflowY: "scroll",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "grey.600",
        }}
      >
        <Box sx={{ maxWidth: "20%" }}>
          <Logo />
        </Box>
        <HiChevronDoubleLeft />
      </Box>
      <Box>
        <Box
          sx={{
            backgroundColor: "grey.200",
            display: "flex",
            p: 2,
            alignItems: "center",
            borderRadius: "10px",
            mt: 1,
          }}
        >
          <Box sx={{ marginRight: "0.5rem" }}>
            <Avatar src={user?.profileUrl || "/astronaut.png"} size="lg" />
          </Box>
          <Box>
            <Typography variant="h6" textTransform="capitalize">
              {user?.displayName || getNameFromEmail(user?.email)}
            </Typography>
            {user?.email && (
              <Typography variant="body2" sx={{ color: "grey.500" }}>
                {user.email}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {menus.map((nav) => (
        <Box key={nav.title} mt={3}>
          <Typography
            mb={2}
            variant="subtitle2"
            sx={{ textTransform: "uppercase" }}
          >
            {nav.title}
          </Typography>

          {nav.menuItems.map((menu) => (
            <NavigationLinkTab
              key={menu.label}
              label={menu.label}
              icon={menu.icon}
              link={menu.link}
              subList={menu?.subMenuItems}
            />
          ))}
        </Box>
      ))}
    </Paper>
  );
}

export default SideNav;
