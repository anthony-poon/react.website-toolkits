import { Box, useMediaQuery, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

export const ResponsiveDrawer = ({ children, isOpen, onClose, width = 240 }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <nav
      style={
        isDesktop
          ? {
            width,
            flexShrink: 0,
          }
          : {}
      }>
      <Hidden mdUp implementation={"js"}>
        <Drawer
          classes={{
            paper: {
              width,
            },
          }}
          anchor={"left"}
          variant="temporary"
          open={isOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          <Toolbar />
          <div>
            <List >
              <Box overflow={"auto"}>{children}</Box>
            </List>
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation={"js"}>
        <Drawer
          classes={{
            paper: {
              width,
            },
          }}
          variant="permanent"
          open>
          <Toolbar />
          <div>
            <List >
              <Box overflow={"auto"} >{children}</Box>
            </List>
          </div>
        </Drawer>
      </Hidden>
    </nav>
  );
};
