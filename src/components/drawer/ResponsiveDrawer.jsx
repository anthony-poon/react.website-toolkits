import { Box, useMediaQuery, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React from "react";

const MobileDrawer = (props) => {
  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.width },
      }}>
      {props.children}
    </Drawer>
  );
};

const DesktopDrawer = (props) => {
  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: props.width,
        [`& .MuiDrawer-paper`]: { width: props.width, boxSizing: "border-box" },
      }}>
      {props.children}
    </Drawer>
  );
};

export const ResponsiveDrawer = ({ children, isOpen, onClose, width = 240 }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const DrawerImpl = isDesktop ? DesktopDrawer : MobileDrawer;
  return (
    <Box width={isDesktop ? width : 0}>
      <DrawerImpl width={width} open={isOpen} onClose={onClose}>
        <Box
          height={80}
          style={{
            flexShrink: 0,
          }}
        />
        {children}
      </DrawerImpl>
    </Box>
  );
};
