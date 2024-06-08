import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

export const ClippedAppBar = ({ children, onDrawerToggle }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <AppBar
      elevation={0}
      position="fixed"
      style={{
        zIndex: 3,
      }}>
      <Toolbar
        style={{
          justifyContent: "space-between",
        }}>
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
