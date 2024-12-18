import { Box, useMediaQuery, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

export const ResponsiveDrawer = ({ children, isOpen, onClose, sx = {}}) => {
  const theme = useTheme();

  const drawerStyles = {
    width: "auto", // Automatically adjust width based on content
    flexShrink: 0,
    ...sx, // Allow custom styles via sx prop
  };

  return (
    <nav>
      <Hidden mdUp implementation={"js"}>
        <Drawer
          anchor={"left"}
          variant="temporary"
          open={isOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: drawerStyles, // Apply dynamic width here
          }}
          >
          <Toolbar />
          <div>
            <List>
              <Box overflow={"auto"}>{children}</Box>
            </List>
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation={"js"}>
        <Drawer
              PaperProps={{
                sx: drawerStyles, // Apply dynamic width here
              }}
          variant="permanent"
          open>
          <Toolbar />
          <div>
            <List>
              <Box overflow={"auto"}>{children}</Box>
            </List>
          </div>
        </Drawer>
      </Hidden>
    </nav>
  );
};
