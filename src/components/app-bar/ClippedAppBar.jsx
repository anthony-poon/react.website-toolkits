import { useMediaQuery, useTheme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

export const ClippedAppBar = ({ children, onDrawerToggle }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <AppBar
      position="fixed"
      style={{
        zIndex: 1201,
      }}>
      <Toolbar>
        {!isDesktop && onDrawerToggle && (
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}
        {children}
      </Toolbar>
    </AppBar>
  );
};
