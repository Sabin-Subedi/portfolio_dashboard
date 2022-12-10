import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";

const LinkWrapper = ({ children, link, recordId }) => {
  return (
    <Link href={link.replace(":recordId", recordId)} passHref>
      {children}
    </Link>
  );
};

function TableAction({ record, actions }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ color: open ? "primary.main" : "grey.600" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <FiMoreVertical />
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
            borderRadius: "0.5rem",
            minWidth: "10rem",
            padding: "0.5rem",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 15,
              right: -5,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "top", vertical: "top" }}
      >
        {actions.map((item, index) => {
          const mennuWrapper = (
            <MenuItem sx={{ borderRadius: "0.4rem" }}>
              {item.component ? <item.component record={record} /> : item.item}
            </MenuItem>
          );

          return item?.link ? (
            <LinkWrapper link={item.link} recordId={record.id}>
              {mennuWrapper}
            </LinkWrapper>
          ) : (
            mennuWrapper
          );
        })}
      </Menu>
    </>
  );
}

export default TableAction;
